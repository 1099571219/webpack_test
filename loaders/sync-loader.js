// context 文件内容
// map SourceMap
// meta 别的 loader 传递的数据
module.exports = function (context, map, meta) {
    console.log('sync-loader-meta')
    console.log(meta)
    //第一个参数为要传递的错误信息
    this.callback(null, context, map, meta)
}
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('pitch')
    console.log('remainingRequest')
    // console.log(remainingRequest)
    console.log('precedingRequest')
    // console.log(precedingRequest)
    // return 'stop' //执行后会跳过后续 loader 只执行 normal 前一个 raw-loader
};