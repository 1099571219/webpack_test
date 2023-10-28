// context 文件内容
// map SourceMap
// meta 别的 loader 传递的数据
module.exports = function (context, map, meta) {
    console.log('async-loader-meta')
    console.log(meta)
    meta = meta ?? []
    meta.push(1)
    const callback = this.async()
    setTimeout(() => {
        callback(null, context, map, meta)
    }, 1000);
}