module.exports = class CleanWebpackPlugin {


    constructor() { }
    apply(compiler) {
        //1. 注册钩子，再打包输出之前 emit
        //2. 获取打包输出的目录
        //3. 通过 fs 删除打包输出的目录下所有文件
        const outputPath = compiler.options.output.path
        const fs = compiler.outputFileSystem

        compiler.hooks.emit.tapAsync('cleanWebpackPlugin', (compilation, callback) => {
            console.log('cleanWebpackPlugin ______________ emit');
            this.removeFiles(fs, outputPath)
            callback()
        })
    }
    removeFiles(fs, filePath) {
        const files = fs.readdirSync(filePath)
        files.forEach(file => {
            const path = `${filePath}\\${file}`
            const fileStat = fs.statSync(path)
            if (fileStat.isDirectory()) {
                this.removeFiles(fs, path)
            } else {
                fs.unlinkSync(path)
            }
        });
    }
}