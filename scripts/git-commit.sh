#!/bin/bash

# 设置颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# 检查是否有未提交的更改
check_changes() {
    if [ -z "$(git status --porcelain)" ]; then
        print_message "没有需要提交的更改"
        exit 0
    fi
}

# 添加所有更改
add_changes() {
    print_message "正在添加更改..."
    git add .
}

# 提交更改
commit_changes() {
    if [ -z "$1" ]; then
        print_error "请提供提交信息"
        exit 1
    fi
    
    print_message "正在提交更改..."
    git commit -m "$1"
}

# 推送到远程仓库
push_changes() {
    print_message "正在推送到远程仓库..."
    git push
}

# 主函数
main() {
    # 检查参数
    if [ $# -eq 0 ]; then
        print_error "使用方法: ./git-commit.sh \"提交信息\""
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

    print_message "代码提交完成！"
}

# 执行主函数
main "$@" 