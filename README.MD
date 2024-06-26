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





## Docusaurus 快速入门
首先，我们在根目录下执行：

```bash
npx create-docusaurus@latest website classic

# 启动
cd website  
npm run start
```

执行 npx 运行一个命令时，如果没有安装则 npx 会临时帮助我们安装这个包，执行完毕以后会将其删除。

其中，create-docusaurus 是一个命令行工具，用于快速创建 Docusaurus 项目，classic 是一个预设模板，包含了标准文档、博客、自定义页面及 CSS 框架（支持暗黑模式），可以更快地生成一个网站。


### 目录结构
```js
website
├── blog // 包含博客的 Markdown 文件
│   ├── 2021-08-26-welcome
│   │   ├── docusaurus-plushie-banner.jpeg
│   │   └── index.md
│   ├── 2019-05-28-first-blog-post.md
│   ├── 2019-05-29-long-blog-post.md
│   ├── 2021-08-01-mdx-blog-post.mdx
│   └── authors.yml
├── docs // 包含文档的 Markdown 文件
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src // 页面或自定义 React 组件一类的非文档文件，其中 /src/pages 目录中的 JSX/TSX/MDX 文件都会被转换成网站页面，比如网站首页对应了src/pages/index.js文件。
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static // 静态目录。 此处的所有内容都会被复制进 build 文件夹。
│   └── img
├── docusaurus.config.js // 站点配置文件。
├── package.json
├── README.md
├── sidebars.js // 用于配置侧边栏，分为自动生成和手动配置。
└── yarn.lock
```
