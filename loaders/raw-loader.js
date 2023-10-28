module.exports = function (context) {
    console.log('raw-loader-context');
    // console.log(context);
    return context
}
module.exports.raw = true //设置接受数据为 buffer