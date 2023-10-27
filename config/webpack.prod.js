const os = require('os')
const TerserPlugin = require("terser-webpack-plugin");
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
            loader: 'postcss-loader', //浏览器兼容性优化
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
const threads = os.cpus().length - 1
module.exports = {
    //入口文件
    entry: "./src/main.js",//相对路径
    output: {
        path: path.resolve(__dirname, '../dist'),//绝对路径
        //入口文件打包输出文件名
        filename: 'static/js/[name].[contenthash:8].js',
        //打包输出的动态文件命名
        chunkFilename: 'static/js/[name].[contenthash:8].js',
        clean: true //自动清理 path 目录后再进行打包
    },
    module: {
        rules: [
            //loader的配置
            {
                //每个文件只能被其中一个 loader 配置处理 类似 if(){}else()
                oneOf: [
                    {
                        test: /\.css$/,//检测的文件
                        use: getStyleLoader()
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader("sass-loader")
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
                        // exclude: /node_modules/, // 排除 node_modules 中的 js 文件
                        include: path.resolve(__dirname, "../src"),
                        use: [
                            {
                                loader: "thread-loader",
                                options: {
                                    workers: threads
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, //开启 babel 缓存
                                    cacheCompression: false, //关闭保存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"]
                                    //     presets: ["@babel/preset-env"]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        //插件配置
        //plugin 配置
        new ESLintPlugin({
            //检查文件
            context: path.resolve(__dirname, "../src"),
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
            threads,
            exclude: "node_modules" //默认值
        }),
        new HtmlWebpackPlugin({
            //以 template 为模板创建新的 html 文件
            //新的 html 文件特点：和模板结构一直，自动引入打包输出的资源
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css"
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),// css 文件压缩
            new TerserPlugin()
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                default: {
                    minChunks: 1,
                    minSize: 1,
                }
            }
        },
        runtimeChunk: {
            name: (entrypoint) => {
                return `runtime=${entrypoint.name}.js`
            }
        }
    },
    mode: 'production',
    devtool: 'source-map'
}