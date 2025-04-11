#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 最大重试次数
MAX_RETRIES=3
# 重试间隔（秒）
RETRY_DELAY=5

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# 检查网络连接
check_network() {
    print_step "检查网络连接..."
    if ! ping -c 1 github.com &> /dev/null; then
        print_error "无法连接到 GitHub"
        print_message "请检查网络连接或尝试以下方法："
        print_message "1. 检查网络设置"
        print_message "2. 尝试使用代理"
        print_message "3. 使用其他网络"
        return 1
    fi
    print_message "网络连接正常"
    return 0
}

# 检查 Git 是否安装
check_git() {
    if ! command -v git &> /dev/null; then
        print_error "Git 未安装，请先安装 Git"
        print_message "安装方法："
        print_message "1. macOS: brew install git"
        print_message "2. Ubuntu: sudo apt-get install git"
        print_message "3. Windows: 下载 Git for Windows"
        exit 1
    fi
}

# 检查是否在 Git 仓库中
check_git_repo() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        print_error "当前目录不是 Git 仓库"
        print_message "请确保在正确的项目目录中运行此脚本"
        exit 1
    fi
}

# 检查远程仓库配置
check_remote() {
    if ! git remote get-url origin &> /dev/null; then
        print_error "未配置远程仓库"
        print_message "请先配置远程仓库："
        print_message "git remote add origin <repository-url>"
        exit 1
    fi
}

# 检查是否有未提交的更改
check_changes() {
    print_step "检查工作区状态..."
    if [ -z "$(git status --porcelain)" ]; then
        print_message "工作区是干净的，没有需要提交的更改"
        exit 0
    fi
    
    print_message "发现以下更改："
    git status -s
}

# 添加所有更改
add_changes() {
    print_step "准备添加更改到暂存区..."
    git add .
    if [ $? -eq 0 ]; then
        print_message "所有更改已添加到暂存区"
    else
        print_error "添加更改失败"
        exit 1
    fi
}

# 提交更改
commit_changes() {
    if [ -z "$1" ]; then
        print_error "提交信息不能为空"
        print_message "使用方法: npm run git-commit -- \"提交信息\""
        print_message "例如: npm run git-commit -- \"feat(user): 添加用户管理功能\""
        exit 1
    fi
    
    print_step "正在提交更改..."
    git commit -m "$1"
    
    if [ $? -eq 0 ]; then
        print_message "提交成功！提交信息: $1"
    else
        print_error "提交失败，请检查提交信息格式"
        print_message "建议使用以下格式："
        print_message "feat: 新功能"
        print_message "fix: 修复问题"
        print_message "docs: 文档更新"
        print_message "style: 代码格式调整"
        print_message "refactor: 代码重构"
        print_message "test: 测试相关"
        print_message "chore: 构建过程或辅助工具的变动"
        exit 1
    fi
}

# 推送到远程仓库（带重试机制）
push_changes() {
    print_step "准备推送到远程仓库..."
    print_message "正在推送更改到 origin/master..."
    
    local retry_count=0
    local success=0
    
    while [ $retry_count -lt $MAX_RETRIES ] && [ $success -eq 0 ]; do
        if [ $retry_count -gt 0 ]; then
            print_warning "第 $retry_count 次重试推送..."
            sleep $RETRY_DELAY
        fi
        
        git push
        
        if [ $? -eq 0 ]; then
            success=1
            print_message "推送成功！"
        else
            retry_count=$((retry_count + 1))
            if [ $retry_count -lt $MAX_RETRIES ]; then
                print_warning "推送失败，准备重试..."
                print_message "尝试使用备用协议..."
                
                # 尝试使用 SSH 协议
                if [[ "$(git remote get-url origin)" == https://* ]]; then
                    print_message "切换到 SSH 协议..."
                    git remote set-url origin git@github.com:liangbule/admin-dashboard.git
                else
                    print_message "切换到 HTTPS 协议..."
                    git remote set-url origin https://github.com/liangbule/admin-dashboard.git
                fi
            fi
        fi
    done
    
    if [ $success -eq 0 ]; then
        print_error "推送失败，请检查以下可能的问题："
        print_message "1. 网络连接是否正常"
        print_message "2. GitHub 是否可访问"
        print_message "3. 仓库权限是否正确"
        print_message "4. 是否配置了 SSH 密钥"
        print_message "5. 是否使用了正确的远程仓库地址"
        print_message ""
        print_message "解决方案："
        print_message "1. 检查网络连接"
        print_message "2. 确认 GitHub 是否可访问"
        print_message "3. 检查仓库权限"
        print_message "4. 尝试使用 SSH 方式连接："
        print_message "   git remote set-url origin git@github.com:liangbule/admin-dashboard.git"
        print_message "5. 使用个人访问令牌："
        print_message "   git remote set-url origin https://<token>@github.com/liangbule/admin-dashboard.git"
        print_message "6. 配置 Git 使用 HTTP/1.1："
        print_message "   git config --global http.version HTTP/1.1"
        exit 1
    fi
}

# 主函数
main() {
    print_step "开始代码提交流程..."
    
    # 检查网络连接
    if ! check_network; then
        print_error "网络连接检查失败，请检查网络设置"
        exit 1
    fi
    
    # 检查 Git 环境
    check_git
    check_git_repo
    check_remote
    
    # 检查参数
    if [ $# -eq 0 ]; then
        print_error "缺少提交信息参数"
        print_message "使用方法: npm run git-commit -- \"提交信息\""
        print_message "例如: npm run git-commit -- \"feat(user): 添加用户管理功能\""
        exit 1
    fi

    # 检查是否有未提交的更改
    check_changes

    # 添加更改
    add_changes

    # 提交更改
    commit_changes "$1"

    # 推送到远程仓库
    push_changes

    print_message "代码提交流程完成！"
    print_message "可以在 GitHub 上查看提交记录"
}

# 执行主函数
main "$@" 