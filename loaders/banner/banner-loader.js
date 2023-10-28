const schema = require('./schema.json')
module.exports = function (context) {
    const options = this.getOptions(schema)
    const prefix = `
    /*
    *  Author:${options.author}
    */`
    return prefix + context
}