const express = require('express')

const app = express();

app.set('secret','fdfdashjkhu')
// 使用跨域模块
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000');
})