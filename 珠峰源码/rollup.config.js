import babel from 'rollup-plugin-babel'
// rollup 默认可以到处一个对象，作为打包的配置文件
export default {
    input: './src/index.js',
    output:{
        file:'./dist/vue.js',
        name: 'Vue', // 暂时理解为添加一个全局变量名字
        format:'umd',//esm es6 commonjs iife umd
        sourcemap:true // 调试代码
    },
    plugins:[
        babel({
            exclude: 'node_modules/**' // 排除node_modules所有文件
        })    
    ]
}