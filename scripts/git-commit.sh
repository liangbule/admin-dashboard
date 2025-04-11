#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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
    print_message "所有更改已添加到暂存区"
}

# 提交更改
commit_changes() {
    if [ -z "$1" ]; then
        print_error "提交信息不能为空"
        print_message "使用方法: ./git-commit.sh \"提交信息\""
        print_message "例如: ./git-commit.sh \"feat(user): 添加用户管理功能\""
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

# 推送到远程仓库
push_changes() {
    print_step "准备推送到远程仓库..."
    print_message "正在推送更改到 origin/master..."
    
    git push
    
    if [ $? -eq 0 ]; then
        print_message "推送成功！"
    else
        print_error "推送失败，请检查网络连接或仓库权限"
        print_message "常见问题解决方案："
        print_message "1. 检查网络连接"
        print_message "2. 确认 GitHub 是否可访问"
        print_message "3. 检查仓库权限"
        print_message "4. 尝试使用 SSH 方式连接"
        exit 1
    fi
}

# 主函数
main() {
    print_step "开始代码提交流程..."
    
    # 检查参数
    if [ $# -eq 0 ]; then
        print_error "缺少提交信息参数"
        print_message "使用方法: ./git-commit.sh \"提交信息\""
        print_message "例如: ./git-commit.sh \"feat(user): 添加用户管理功能\""
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