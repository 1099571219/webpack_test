module.exports = class AnalyzeWebpackPlugin {
    constructor() { }
    apply(compiler) {
        let content = `| 资源名称 | 资源体积 |
| --- | --- |`
        compiler.hooks.make.tap('analyze-webpack-plugin', (compilation) => {
            console.log('analyze-webpack-plugin ______________ make');

            compilation.hooks.processAssets.tapAsync({ name: 'analyze-webpack-plugin' }, (assets, callback) => {
                Object.entries(assets).forEach(([key, val]) => {
                    content += `\n| ${key} | ${val.size()} Byte|`
                });
                console.log(content)
                assets['analyze.md'] = new compiler.webpack.sources.RawSource(content)
                callback()
            })

        })
    }
}