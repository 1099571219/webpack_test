/*
    1.首先 webpack 会加载 webpack.config.js 中的所有配置，此时就会 new TestPlugin() ，执行插件的 constructor
    2.webpack 创建唯一一次 compiler 对象
    3.遍历 plugins 里的所有插件，调用插件的 apply 方法，将 compiler 作为参数传入
    4.执行剩下编译流程 （触发后续各个 hooks 事件）
*/

class TestPlugin {
    constructor() {
        console.log("TestPlugin")

    }
    apply(compiler) {
        console.log('apply TestPlugin')
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin ______________ environment 111');
        });
        //文档说明： emit 是异步串行钩子，后续需要等待 emit 完成后执行
        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            console.log("TestPlugin ______________ emit");
            setTimeout(() => {
                console.log('TestPlugin ______________ emit 222');
                callback()
            }, 100)
        });
        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin ______________ emit 333');
                    resolve()
                }, 100)
            })
        });
        //文档说明： make 是异步并行钩子，谁先返回结果就处理谁
        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            console.log("TestPlugin ______________ make");
            // 需要在 compilation hooks 触发前注册才能生效
            compilation.hooks.seal.tap("TestPlugin", () => {
                console.log("TestPlugin ______________ seal");
            })
            setTimeout(() => {
                console.log('TestPlugin ______________ make 444');
                callback()
            }, 500)
        });
        compiler.hooks.make.tapPromise('TestPlugin', (compilation) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('TestPlugin ______________ make 555');
                    resolve()
                }, 100)
            })
        });
    }
}

module.exports = TestPlugin