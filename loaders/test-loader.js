// context 文件内容
// map SourceMap
// meta 别的 loader 传递的数据
module.exports = function (context, map, meta) {
    console.log('context111')
    console.log(context)
    console.log('map111')
    console.log(map)
    console.log('meta111')
    console.log(meta)
    meta = meta ?? []
    meta.push(1)
    this.callback(null, context, map, meta)
}