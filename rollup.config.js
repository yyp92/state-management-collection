const createBabelConfig = require('./babel.config.js')

// @rollup/plugin-node-resolve：用于帮助 Rollup 解析第三方模块的导入。在 JavaScript 中，当你使用 import 语句导入模块时，需要一个机制来定位和加载这些模块。
const resolve = require('@rollup/plugin-node-resolve')
// @rollup/plugin-babel：用于集成 Babel 编译器到 Rollup 打包过程。
const babelPlugin = require('@rollup/plugin-babel')
// @rollup/plugin-commonjs：主要作用是将 CommonJS 模块转换为 ES6 模块。这个插件对于处理那些以 CommonJS 格式编写的第三方模块（通常是在 Node.js 环境中使用的模块）非常有用。
const commonjs = require('@rollup/plugin-commonjs')
// rollup-plugin-dts：用于处理 TypeScript 的类型声明文件（*.d.ts）
const { dts } = require('rollup-plugin-dts')

const banner2 = require('rollup-plugin-banner2')

const extensions = ['.ts', '.tsx']
const cscComment = `'use client';\n`

function getBabelOptions() {
    return {
        ...createBabelConfig,
        extensions,
        babelHelpers: 'bundled',
        comments: false,
    }
}

// 生成 TypeScript 定义
function createDeclarationConfig(input, output) {
    return {
        input,
        output: {
          file: output,
          format: 'es',
        },
        plugins: [dts()],
    }
}

// MJS 
function createESMConfig(input, output) {
    return {
        input,
        output: { file: output, format: 'esm' },
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babelPlugin(getBabelOptions()),
            banner2(() => cscComment),
        ],
    }
}

// CJS
function createCommonJSConfig(input, output) {
    return {
        input,
        output: { file: output, format: 'cjs' },
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babelPlugin(getBabelOptions()),
            banner2(() => cscComment),
        ],
    }
}

// UMD
function createUMDConfig(input, output, name) {
    return {
        input,
        output: { file: output, format: 'umd', name },
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babelPlugin(getBabelOptions()),
            banner2(() => cscComment),
        ],
    }
}

// 在 rollup.config.js 导出了一个函数，该函数返回了一个数组，用于生成多个不同类型的构建产物。同时我们创建了四个函数，用来分别对应生成 TypeScript 定义、UMD、CJS、MJS 产物。然后我们根据 package 输入项来控制打包入口 input 和打包产物输入路径 output。
module.exports = (args) => {
    const packageName = args.package

    const input = `packages/${packageName}/src/index.ts`
    const output = `packages/${packageName}/dist`

    return [
        createDeclarationConfig(input, `${output}/index.d.ts`),
        createESMConfig(input, `${output}/index.mjs`),
        createCommonJSConfig(input, `${output}/index.cjs`),
        createUMDConfig(input, `${output}/index.umd.js`, packageName),
    ]
}
