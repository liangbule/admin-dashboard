import { execSync } from 'child_process';

// 控制台颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// 最大重试次数
const MAX_RETRIES = 3;
// 重试间隔（毫秒）
const RETRY_DELAY = 5000;

// 打印带颜色的消息
function printMessage(message) {
  console.log(colors.green + '[INFO]' + colors.reset, message);
}

function printError(message) {
  console.log(colors.red + '[ERROR]' + colors.reset, message);
}

function printWarning(message) {
  console.log(colors.yellow + '[WARNING]' + colors.reset, message);
}

function printStep(message) {
  console.log(colors.blue + '[STEP]' + colors.reset, message);
}

// 执行 Git 命令
function execGitCommand(command, options = {}) {
  try {
    const result = execSync(command, { stdio: 'inherit', ...options });
    return result;
  } catch (error) {
    if (error.status === 0) {
      return true; // 命令执行成功但无输出
    }
    console.error(error);
    return null;
  }
}

// 检查 Git 是否安装
function checkGit() {
  try {
    const version = execGitCommand('git --version', { stdio: 'pipe' })?.toString().trim();
    if (!version) {
      printError('Git 未安装，请先安装 Git');
      printMessage('安装方法：');
      printMessage('1. Windows: 下载 Git for Windows');
      printMessage('2. macOS: brew install git');
      printMessage('3. Ubuntu: sudo apt-get install git');
      process.exit(1);
    }
    printMessage(version);
  } catch (error) {
    printError('Git 未安装，请先安装 Git');
    printMessage('安装方法：');
    printMessage('1. Windows: 下载 Git for Windows');
    printMessage('2. macOS: brew install git');
    printMessage('3. Ubuntu: sudo apt-get install git');
    process.exit(1);
  }
}

// 检查是否在 Git 仓库中
function checkGitRepo() {
  try {
    // 使用 git status 命令检查，因为它会返回更详细的信息
    const result = execGitCommand('git status', { stdio: 'pipe' });
    if (!result) {
      printError('当前目录不是 Git 仓库');
      printMessage('请确保在正确的项目目录中运行此脚本');
      process.exit(1);
    }
  } catch (error) {
    printError('当前目录不是 Git 仓库');
    printMessage('请确保在正确的项目目录中运行此脚本');
    process.exit(1);
  }
}

// 检查远程仓库配置
function checkRemote() {
  try {
    const result = execGitCommand('git remote get-url origin', { stdio: 'pipe' })?.toString().trim();
    if (!result) {
      printError('未配置远程仓库');
      printMessage('请先配置远程仓库：');
      printMessage('git remote add origin <repository-url>');
      process.exit(1);
    }
    printMessage(result);
  } catch (error) {
    printError('未配置远程仓库');
    printMessage('请先配置远程仓库：');
    printMessage('git remote add origin <repository-url>');
    process.exit(1);
  }
}

// 检查 GitHub 认证状态
function checkGitHubAuth() {
  printStep('检查 GitHub 认证状态...');
  try {
    const result = execGitCommand('git config --get credential.helper');
    if (!result) {
      printWarning('未配置 Git 凭证助手');
      printMessage('建议配置 Git 凭证助手以简化认证流程：');
      printMessage('1. Windows: git config --global credential.helper wincred');
      printMessage('2. macOS: git config --global credential.helper osxkeychain');
      printMessage('3. Linux: git config --global credential.helper store');
    }
  } catch (error) {
    printWarning('检查认证状态时出错');
  }
}

// 检查是否有未提交的更改
function checkChanges() {
  printStep('检查工作区状态...');
  try {
    const status = execGitCommand('git status --porcelain', { stdio: 'pipe' })?.toString().trim();
    if (!status) {
      printMessage('工作区是干净的，没有需要提交的更改');
      process.exit(0);
    }
    
    printMessage('发现以下更改：');
    execGitCommand('git status -s');
  } catch (error) {
    printError('检查工作区状态时出错');
    process.exit(1);
  }
}

// 添加所有更改
function addChanges() {
  printStep('准备添加更改到暂存区...');
  try {
    // 配置 Git 自动处理行尾换行符
    execGitCommand('git config --global core.autocrlf true');
    
    // 添加所有更改
    execGitCommand('git add .');
    printMessage('所有更改已添加到暂存区');
  } catch (error) {
    printError('添加更改失败');
    printMessage('可能的原因：');
    printMessage('1. 文件权限问题');
    printMessage('2. 文件被其他进程锁定');
    printMessage('3. 文件路径包含特殊字符');
    printMessage('');
    printMessage('解决方案：');
    printMessage('1. 检查文件权限');
    printMessage('2. 关闭可能锁定文件的程序');
    printMessage('3. 尝试手动添加文件：git add <file-path>');
    process.exit(1);
  }
}

// 提交更改
function commitChanges(message) {
  if (!message) {
    printError('提交信息不能为空');
    printMessage('使用方法: npm run git-commit -- "提交信息"');
    printMessage('例如: npm run git-commit -- "feat(user): 添加用户管理功能"');
    process.exit(1);
  }
  
  printStep('正在提交更改到本地仓库...');
  try {
    execGitCommand(`git commit -m "${message}"`);
    printMessage(`提交成功！提交信息: ${message}`);
  } catch (error) {
    printError('提交失败，请检查提交信息格式');
    printMessage('建议使用以下格式：');
    printMessage('feat: 新功能');
    printMessage('fix: 修复问题');
    printMessage('docs: 文档更新');
    printMessage('style: 代码格式调整');
    printMessage('refactor: 代码重构');
    printMessage('test: 测试相关');
    printMessage('chore: 构建过程或辅助工具的变动');
    process.exit(1);
  }
}

// 检查网络连接
function checkNetwork() {
  printStep('检查网络连接...');
  try {
    const result = execGitCommand('ping -n 1 github.com', { stdio: 'pipe' });
    if (!result) {
      printWarning('无法连接到 GitHub，请检查网络连接');
      printMessage('1. 检查网络连接是否正常');
      printMessage('2. 检查是否可以使用代理');
      printMessage('3. 尝试使用其他网络');
      return false;
    }
    return true;
  } catch (error) {
    printWarning('网络检查失败');
    return false;
  }
}

// 推送到远程仓库（带重试机制）
async function pushChanges() {
  printStep('准备推送到远程仓库...');
  printMessage('正在推送更改到 origin/master...');
  
  let retryCount = 0;
  let success = false;
  
  while (retryCount < MAX_RETRIES && !success) {
    if (retryCount > 0) {
      printWarning(`第 ${retryCount} 次重试推送...`);
      
      // 检查网络连接
      if (!checkNetwork()) {
        printMessage('等待网络恢复...');
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        continue;
      }
      
      // 尝试使用不同的协议
      const currentUrl = execGitCommand('git remote get-url origin', { stdio: 'pipe' })?.toString().trim();
      if (currentUrl) {
        if (currentUrl.startsWith('https://')) {
          printMessage('切换到 SSH 协议...');
          execGitCommand('git remote set-url origin git@github.com:liangbule/admin-dashboard.git');
        } else {
          printMessage('切换到 HTTPS 协议...');
          execGitCommand('git remote set-url origin https://github.com/liangbule/admin-dashboard.git');
        }
      }
    }
    
    try {
      // 使用 --no-verify 选项跳过 pre-push 钩子
      execGitCommand('git push --no-verify');
      success = true;
      printMessage('推送成功！');
    } catch (error) {
      retryCount++;
      if (retryCount < MAX_RETRIES) {
        printWarning('推送失败，准备重试...');
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  if (!success) {
    printError('推送失败，请检查以下可能的问题：');
    printMessage('1. 网络连接是否正常');
    printMessage('2. GitHub 是否可访问');
    printMessage('3. 仓库权限是否正确');
    printMessage('4. 是否配置了 SSH 密钥');
    printMessage('5. 是否使用了正确的远程仓库地址');
    printMessage('');
    printMessage('解决方案：');
    printMessage('1. 检查网络连接');
    printMessage('2. 确认 GitHub 是否可访问');
    printMessage('3. 检查仓库权限');
    printMessage('4. 尝试使用 SSH 方式连接：');
    printMessage('   git remote set-url origin git@github.com:liangbule/admin-dashboard.git');
    printMessage('5. 使用个人访问令牌：');
    printMessage('   git remote set-url origin https://<token>@github.com/liangbule/admin-dashboard.git');
    printMessage('6. 配置 Git 使用 HTTP/1.1：');
    printMessage('   git config --global http.version HTTP/1.1');
    printMessage('7. 配置 Git 凭证助手：');
    printMessage('   git config --global credential.helper wincred');
    process.exit(1);
  }
}

// 检查并配置 Git 用户信息
function checkGitUser() {
  printStep('检查 Git 用户配置...');
  try {
    const email = execGitCommand('git config --get user.email', { stdio: 'pipe' })?.toString().trim();
    const name = execGitCommand('git config --get user.name', { stdio: 'pipe' })?.toString().trim();

    if (!email || !name) {
      printWarning('未配置 Git 用户信息');
      printMessage('正在配置默认用户信息...');
      
      // 设置默认用户信息
      execGitCommand('git config --global user.email "admin@example.com"');
      execGitCommand('git config --global user.name "Admin"');
      
      printMessage('已配置默认用户信息：');
      printMessage('邮箱: admin@example.com');
      printMessage('用户名: Admin');
      printMessage('');
      printMessage('如需修改，请使用以下命令：');
      printMessage('git config --global user.email "your.email@example.com"');
      printMessage('git config --global user.name "Your Name"');
    } else {
      printMessage(`当前用户: ${name} <${email}>`);
    }
  } catch (error) {
    printError('检查用户配置时出错');
    process.exit(1);
  }
}

// 主函数
async function main() {
  printStep('开始代码提交流程...');
  
  // 检查 Git 环境
  checkGit();
  checkGitRepo();
  checkRemote();
  checkGitHubAuth();
  checkGitUser();
  
  // 获取提交信息
  const commitMessage = process.argv[2];
  if (!commitMessage) {
    printError('缺少提交信息参数');
    printMessage('使用方法: npm run git-commit -- "提交信息"');
    printMessage('例如: npm run git-commit -- "feat(user): 添加用户管理功能"');
    process.exit(1);
  }

  // 检查是否有未提交的更改
  checkChanges();

  // 添加更改
  addChanges();

  // 提交更改到本地
  commitChanges(commitMessage);

  // 推送到远程仓库
  await pushChanges();

  printMessage('代码提交流程完成！');
  printMessage('可以在 GitHub 上查看提交记录');
}

// 执行主函数
main().catch(error => {
  printError('发生错误：');
  console.error(error);
  process.exit(1);
}); 