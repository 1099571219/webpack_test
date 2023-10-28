module.exports = function (context) {
    console.log('clean-log-loader');
    return context.replace(/console\.log\(.*\);?/g, "")
}