const path = require("path"); // nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: "./src/main.js",
    // 输出
    output : {
        path: undefined, // 开发模式没有输出
        filename: 'static/js/main.js', // 入口文件打包输出文件名
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            { test: /\.css$/, use: [
                "style-loader",
                "css-loader",
            ]},{ test: /\.s[ac]ss$/, use: [  // loader只能使用一个loader，use可以使用多个loader
                "style-loader",
                "css-loader",
                "sass-loader",
            ]},{ test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: "asset"
            },{
                test: /\.(png|jpe?g|gif|webp|svg)/,
                type: 'asset',
                parser: {
                    dataUrlCondition: { // 小于10kb的图片转为base64； 优点：减少请求数量；缺点：体积偏大
                        maxSize: 10 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'static/images/[hash:10][ext][query]' // [hash:10]：hash值取前十位
                }
            },{ // other resource loader
                test: /\.(ttf|woff?2|mp3|mp4|avi)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[hash:10][ext][query]' // [ hash:10]：hash值取前十位
                }
            },{
                test: /\.js$/,
                exclude: /node_modules/, // 排除文件中的js文件
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'] // 智能预设，能够编译ES6语法
                }
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, '../src'),
        },
        extensions: ['.js', '.jsx'],
    },
    // 插件
    plugins: [ // plugin的配置
        new ESLintPlugin({
            context: path.resolve(__dirname, "../src"), // 检测哪些文件
        }),
        new HtmlWebpackPlugin({
            // 以public/index.html文件创建新的html文件； 特点：1. 结构和原来一致；2. 自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html")
        })
    ],
    devServer: {
        host: "localhost",
        port: "3000",
        open: true
    },
    // 模式
    mode: "development"
}