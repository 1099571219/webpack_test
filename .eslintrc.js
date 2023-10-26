module.exports = {
    //解析选项
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: "module",
        // ecmaFeatures: {
        //     jsx: true
        // }
    },
    //检查规则 优先级最高 0:off 1:warn 2:error
    rules: {
        nosemi: "off", // 禁止使用分号
        "array-callback-return": 1, // 强制数组方法的回调函数中有 return 语句，否则警告
        "default-case": [
            1, // 要求 switch 语句中有 default 分支，否则警告
            { commentPattern: "^no default$" } //允许在最后注释 no default, 就不会有警告了
        ],
        eqeqeq: [
            'warn',
            'smart'
        ]
    },
    //继承规则
    extends: [],
}