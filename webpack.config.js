const path = require('path')
module.exports = {
    //入口文件
    entry: "./src/main.js",//相对路径
    output: {
        path: path.resolve(__dirname, 'dist'),//绝对路径
        //入口文件打包输出文件名
        filename: 'static/main.js',
        clean: true //自动清理 path 目录后再进行打包
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,//检测的文件
                use: [
                    //执行顺序，从右到左（从下到上）
                    "style-loader", // 将 js 中的 css 通过创建 style 标签添加到 html 文件中生效
                    "css-loader" // 将 css 资源编译成 commonjs 模块到 js 中
                ]
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
            }
        ]
    },
    plugins: [
        //插件配置
    ],
    mode: 'development'

}