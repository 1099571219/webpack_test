// context 文件内容
// map SourceMap
// meta 别的 loader 传递的数据
module.exports = (context, map, meta) => {
    console.log('context222')
    console.log(context)
    console.log('map222')
    console.log(map)
    console.log('meta222')
    console.log(meta)
    return context
}