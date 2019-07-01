const express = require('express')

const app = express();

app.set('secret','fdfdashjkhu')
app.set('web-secret','web')
// 使用跨域模块
app.use(require('cors')())
app.use(express.json())

const assert = require("http-assert");

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(3000,()=>{
  console.log('http://localhost:3000');
})