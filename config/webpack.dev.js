const os = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const getStyleLoader = (pre) => {
    return [
        //执行顺序，从右到左（从下到上）
        "style-loader",// 将 js 中的 css 通过创建 style 标签添加到 html 文件中生效
        "css-loader", // 将 css 资源编译成 commonjs 模块到 js 中
        pre
    ].filter(Boolean)
}
const threads = os.cpus().length - 1
module.exports = {
    //入口文件
    entry: "./src/main.js",//相对路径
    output: {
        // path: path.resolve(__dirname, 'dist'),//绝对路径
        //入口文件打包输出文件名
        // filename: 'static/main.js',
        // clean: true //自动清理 path 目录后再进行打包
    },
    module: {
        rules: [
            //loader的配置
            {
                oneOf: [
                    {
                        test: /\.css$/,//检测的文件
                        use: getStyleLoader()
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader("sass-loader")// 将 sass 编译成 css 文件
                    },
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
                                    cacheCompression: false //关闭保存文件压缩
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
        })
    ],
    //开发服务器：不会输出资源，在内存中编译打包
    devServer: {
        host: "localhost",//服务器域名
        port: 9000, //服务器端口号
        open: true //自动打开浏览器
    },
    mode: 'development',
    devtool: 'cheap-module-source-map'


}