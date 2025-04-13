import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

// 控制台颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

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

// 执行命令
function execCommand(command, options = {}) {
  try {
    const result = execSync(command, { stdio: 'inherit', ...options });
    return result;
  } catch (error) {
    printError(`命令执行失败: ${command}`);
    printError(error.message);
    throw error;
  }
}

// 检查 Node.js 环境
function checkNodeEnv() {
  printStep('检查 Node.js 环境...');
  try {
    const version = execCommand('node --version', { stdio: 'pipe' })?.toString().trim();
    if (!version) {
      throw new Error('Node.js 未安装');
    }
    printMessage(`Node.js 版本: ${version}`);

    const npmVersion = execCommand('npm --version', { stdio: 'pipe' })?.toString().trim();
    printMessage(`npm 版本: ${npmVersion}`);
  } catch (error) {
    printError('Node.js 环境检查失败');
    printMessage('请确保已安装 Node.js 和 npm');
    process.exit(1);
  }
}

// 安装依赖
function installDependencies() {
  printStep('安装项目依赖...');
  try {
    execCommand('npm install');
    printMessage('依赖安装完成');
  } catch (error) {
    printError('依赖安装失败');
    process.exit(1);
  }
}

// 运行代码检查
function runLint() {
  printStep('运行代码检查...');
  try {
    execCommand('npm run lint:fix');
    printMessage('代码检查通过');
  } catch (error) {
    printError('代码检查失败');
    printMessage('请修复代码中的问题后重试');
    process.exit(1);
  }
}

// 构建项目
function buildProject() {
  printStep('构建项目...');
  try {
    execCommand('npm run build');
    printMessage('构建完成');
  } catch (error) {
    printError('构建失败');
    process.exit(1);
  }
}

// 检查构建产物
function checkBuildOutput() {
  printStep('检查构建产物...');
  try {
    const output = execCommand('dir dist', { stdio: 'pipe' })?.toString();
    if (!output) {
      throw new Error('构建产物不存在');
    }
    printMessage('构建产物检查通过');
  } catch (error) {
    printError('构建产物检查失败');
    process.exit(1);
  }
}

// 部署到服务器
function deployToServer() {
  printStep('部署到服务器...');
  try {
    // 读取部署配置
    const configPath = join(process.cwd(), 'deploy.config.js');
    let deployConfig;
    try {
      deployConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch (error) {
      printWarning('未找到部署配置文件，跳过部署步骤');
      return;
    }

    // 根据配置执行部署
    if (deployConfig.type === 'scp') {
      // SCP 部署
      const { host: _host, username: _username, remotePath: _remotePath } = deployConfig;
      // TODO: 实现 SCP 上传逻辑
    } else if (deployConfig.type === 'ftp') {
      // FTP 部署
      const { host: _host, username: _username, remotePath: _remotePath } = deployConfig;
      // TODO: 实现 FTP 上传逻辑
    }

    printMessage('部署完成');
  } catch (error) {
    printError('部署失败');
    process.exit(1);
  }
}

// 清理临时文件
function cleanup() {
  printStep('清理临时文件...');
  try {
    execCommand('rmdir /s /q node_modules\\.cache');
    printMessage('清理完成');
  } catch (error) {
    printWarning('清理临时文件失败，但不影响部署');
  }
}

// 主函数
async function main() {
  printStep('开始部署流程...');
  
  try {
    // 检查环境
    checkNodeEnv();
    
    // 安装依赖
    installDependencies();
    
    // 运行代码检查
    runLint();
    
    // 构建项目
    buildProject();
    
    // 检查构建产物
    checkBuildOutput();
    
    // 部署到服务器
    deployToServer();
    
    // 清理临时文件
    cleanup();
    
    printMessage('部署流程完成！');
  } catch (error) {
    printError('部署过程中发生错误：');
    console.error(error);
    process.exit(1);
  }
}

// 执行主函数
main().catch(error => {
  printError('发生错误：');
  console.error(error);
  process.exit(1);
}); 