module.exports = class BannerPlugin {
    constructor(options = { author: 'xxx' }) {
        this.options = options
        console.log('BannerPlugin');
    }
    apply(compiler) {
        console.log('apply BannerPlugin');
        compiler.hooks.make.tapAsync('BannerPlugin', (compilation, callback) => {
            console.log('BannerPlugin ______________ make');
            compilation.hooks.processAssets.tapAsync({ name: 'BannerPlugin' }, (assets, callback) => {
                console.log('BannerPlugin ______________ processAssets');
                //1. 获取即将输出的资源: compilation.assets
                //2. 过滤只保留 js 和 css 文件
                //3. 遍历剩下资源添加注释
                // console.log(compilation.assets);
                const prefix =
                    `/*
                * Author: ${this.options.author} 
                */`
                // const assets = compilation.getAssets()


                Object.keys(assets).filter(key => {
                    const name = key.split('.')
                    return name.includes('js') || name.includes('css')
                }).forEach(key => {
                    const assetsRaw = assets
                    const source = assets[key].source()
                    const content = prefix + source
                    const com = compilation
                    assets[key] = new compilation.compiler.webpack.sources.RawSource(content);
                })
                callback()
            })
            callback();
        });
    }
}