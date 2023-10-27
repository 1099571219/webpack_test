const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const getStyleLoader = (pre) => {
    return [
        //执行顺序，从右到左（从下到上）
        MiniCssExtractPlugin.loader,
        "css-loader", // 将 css 资源编译成 commonjs 模块到 js 中
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                            {
                                // 其他选项
                            },
                        ],
                    ],
                },
            }
        },
        pre
    ].filter(Boolean)

}

module.exports = {
    //入口文件
    entry: "./src/main.js",//相对路径
    output: {
        path: path.resolve(__dirname, '../dist'),//绝对路径
        //入口文件打包输出文件名
        filename: 'static/js/main.js',
        clean: true //自动清理 path 目录后再进行打包
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,//检测的文件
                use: getStyleLoader()
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader")
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     // "style-loader",
                //     "css-loader",
                //     getStyleLoader(),
                //     "sass-loader", // 将 sass 编译成 css 文件
                // ]
            },
            ,
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader")
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",// asset 通过配置 parser 限制，自动选择转换 Data URI 或发送单独文件至出口目录
                parser: {
                    dataUrlCondition: {
                        //小于 10kb 的图片转 base64
                        // 优点：减少请求数量 缺点：体积更大
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    //输出名称
                    // [hash:10] hash值取前10位
                    //ext 文件扩展名
                    //query ?跟的参数
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:10][ext][query]"
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除 node_modules 中的 js 文件
                loader: "babel-loader",
                // options: {
                //     presets: ["@babel/preset-env"]
                // }
            }
        ]
    },
    plugins: [
        //插件配置
        //plugin 配置
        new ESLintPlugin({
            //检查文件
            context: path.resolve(__dirname, "../src")
        }),
        new HtmlWebpackPlugin({
            //以 template 为模板创建新的 html 文件
            //新的 html 文件特点：和模板结构一直，自动引入打包输出的资源
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
        new CssMinimizerPlugin() // css 文件压缩
    ],
    // optimization: {
    //     minimizer: [
    //         // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
    //         // `...`,
    //         new CssMinimizerPlugin(),
    //     ],
    // },
    mode: 'production'
}