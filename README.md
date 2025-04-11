# Admin Dashboard

一个基于 React + TypeScript + Ant Design 的后台管理系统。

## 技术栈

- React 18
- TypeScript
- Ant Design 5
- React Router 6
- Redux Toolkit
- Vite

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   └── PrivateRoute.tsx  # 路由守卫组件
├── hooks/           # 自定义 Hooks
├── layouts/         # 布局组件
│   ├── MainLayout.tsx    # 主布局
│   └── AuthLayout.tsx    # 认证布局
├── pages/           # 页面组件
│   ├── Banner/      # 轮播图管理
│   ├── Dashboard/   # 仪表盘
│   ├── File/        # 文件管理
│   ├── Login/       # 登录页
│   ├── System/      # 系统设置
│   ├── Tab/         # 标签页管理
│   ├── Tag/         # 标签管理
│   └── User/        # 用户管理
├── router/          # 路由配置
│   ├── index.tsx    # 路由主文件
│   └── routes.tsx   # 路由配置
├── services/        # API 服务
├── store/           # Redux 状态管理
│   ├── index.ts     # Store 配置
│   └── slices/      # Redux Slices
├── styles/          # 样式文件
│   ├── app.css      # 主样式
│   ├── reset.css    # 重置样式
│   └── variables.css # 样式变量
├── types/           # 类型定义
└── utils/           # 工具函数
    ├── logger.ts    # 日志工具
    └── performance.ts # 性能监控
```

## 功能特性

### 1. 用户认证
- 登录/登出功能
- 路由守卫
- Token 管理

### 2. 页面管理
- 仪表盘
- 用户管理
- 轮播图管理
- 标签页管理
- 标签管理
- 文件管理
- 系统设置

### 3. 性能优化
- 组件懒加载
- 防抖/节流
- 性能监控

### 4. 开发工具
- TypeScript 类型检查
- ESLint 代码规范
- 日志系统

## 开发指南

### 安装依赖
```bash
yarn install
```

### 启动开发服务器
```bash
yarn dev
```

### 构建生产版本
```bash
yarn build
```

### 代码规范检查
```bash
yarn lint
```

## 路由配置

主要路由结构：
```typescript
{
  path: '/',
  element: <PrivateRoute><MainLayout /></PrivateRoute>,
  children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'users/*', element: <UserManagement /> },
    { path: 'banner/*', element: <BannerManagement /> },
    { path: 'tab/*', element: <TabManagement /> },
    { path: 'tag/*', element: <TagManagement /> },
    { path: 'file/*', element: <FileManagement /> },
    { path: 'system/*', element: <SystemSettings /> },
  ]
}
```

## 状态管理

使用 Redux Toolkit 管理全局状态：

```typescript
// authSlice.ts
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
```

## 样式管理

使用 CSS 变量统一管理样式：

```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --text-color: rgba(0, 0, 0, 0.85);
  --border-color: #d9d9d9;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

## 最佳实践

1. 组件设计
   - 使用函数组件和 Hooks
   - 遵循单一职责原则
   - 使用 TypeScript 类型定义

2. 状态管理
   - 使用 Redux Toolkit 简化 Redux 代码
   - 合理划分状态作用域
   - 使用异步 action 处理 API 请求

3. 路由管理
   - 使用懒加载优化性能
   - 实现路由守卫保护
   - 统一管理路由配置

4. 样式管理
   - 使用 CSS 变量统一主题
   - 模块化 CSS
   - 响应式设计

5. 性能优化
   - 组件懒加载
   - 防抖/节流
   - 性能监控

## 注意事项

1. 开发环境
   - 使用 Vite 作为构建工具
   - 配置了 TypeScript 和 ESLint
   - 使用 Yarn 作为包管理器

2. 生产环境
   - 启用代码压缩
   - 启用 Tree Shaking
   - 分离第三方库

3. 安全考虑
   - 实现路由守卫
   - 使用 Token 认证
   - 敏感信息加密

## 待优化项

1. 功能完善
   - 添加用户权限管理
   - 完善文件上传功能
   - 添加数据导出功能

2. 性能优化
   - 实现虚拟列表
   - 优化大数据渲染
   - 添加缓存策略

3. 开发体验
   - 添加单元测试
   - 完善错误处理
   - 优化开发工具链
