# express中间件

## req.app === app

### req.app

此属性包含对使用中间件的Express应用程序实例的引用。

如果您遵循创建模块的模式，该模块只导出中间件函数并在主文件中需要（）它，那么中间件可以通过req.app访问Express实例




```javascript
const express = require('express')
const app = express();

app.post('/',middleware,(req,res)={
    /// req.app和app是一个东西
    req.app === app
})
// middleware:
module.exports = (req,res)=>{
    req.app()
}
```

