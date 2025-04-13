export default {
  type: 'scp', // 部署类型：scp 或 ftp
  host: 'your-server-host', // 服务器地址
  port: 22, // 端口号
  username: 'your-username', // 用户名
  password: 'your-password', // 密码
  remotePath: '/path/to/remote/directory' // 远程部署路径
}; 