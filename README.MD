# 深入浅出 React 状态管理库

项目中包含：
- 状态管理库 —— Zustand/Jotai/Valtio/TanStack Query 实现
- 完整的项目配置
- 文档站实现
- 大量的案例代码



## 使用
```bash
# 安装：
pnpm install

# 打包：
pnpm run build

# 运行单元测试：
pnpm run test

# 格式化
pnpm run prettier

# eslint
pnpm run eslint

# 类型检查
pnpm run typecheck

# 发布库
pnpm run release
```




## 目录结构
```js
.
├── .changeset // Changesets 配置，后面章节会介绍
├── .github // github配置项，包含了CI配置
│   └── workflows
├── examples // 一些事例
│   ├── jotai
│   ├── react-query
│   ├── valtio
│   └── zustand
├── packages // monorepo包入口
│   ├── jotai
│   ├── react-query
│   ├── shared // 公共包
│   ├── valtio
│   └── zustand
├── website // 文档站
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── babel.config.js
├── jest.config.ts // jest配置项
├── jest.preset.js // jest预设值
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.MD
├── rollup.config.js
└── tsconfig.json
```




## 命令意思
```js
// 其中 -r 代表命令将递归地在所有子包中执行，--parallel 代表所有子包中的 typecheck 命令将并行执行，而不是依次执行。这可以加快整个过程。
"scripts": {
    "typecheck": "pnpm -r --parallel run typecheck",
},

// 其中 --passWithNoTests 避免当没有任何测试项时报错，--config 指定 Jest 的配置文件。
"scripts": {
    "test": "jest --passWithNoTests --config jest.config.ts"
},
```

