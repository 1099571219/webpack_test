module.exports = function (context) {
    console.log('clean-log-loader____________________');
    return context.replace(/console\.log\(.*\);?/g, "")
}