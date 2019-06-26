# 加密和token



## 

## token逻辑

只能根据用户名去找：

因为密码已经被散列加密了，如果将密码再散列一次，依然和之前散列的不通，所以无法根据密码找

### 1.根据用户名找用户

### 2.校验密码

bcrypt 密码散列

### 3.返回token

整体登录逻辑：

- 1.服务端：先建表，存储用户名和密码，存的是加密后的密码：server-->models-->AdminUser.js

```javascript
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select:false, //查表时不带出password字段
    set(val) {
      // 使用bcrypt进行散列保存 12代表加密程度
      return require('bcrypt').hashSync(val,12);
    }
  }
});
module.exports = mongoose.model("AdminUser", schema);

```

- 2.前端：编写登录页，涉及到一个接口：admin-->src-->Login.vue

  ```javascript
  async login(){
      const res = await this.$http.post('login',this.model)
      localStorage.token = res.data.token;
      console.log(res.data);
      this.$router.push('/')
      this.$message({
          type:'success',
          message:'登录成功'
      })
  }
  ```

  这里面写的请求地址是`login`是因为已经在`http.js`中定义了`baseURL`：admin-->src-->http.js

  ```javascript
  import axios from "axios";
  const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
  });
  ```

- 3.服务端：添加登录页接口：server-->routes-->admin-->index.js

  ```javascript
  const AdminUser = require("../../models/AdminUser");
  
  app.post("/admin/api/login", async (req, res) => {
      // 0.将所有请求的内容赋值给username和password
  	const { username, password } = req.body;
      // 1.根据用户名找用户
      const user = await AdminUser.findOne({ username }).select("+password");
      // 2.校验密码
      const isValid = require("bcrypt").compareSync(password, user.password);
  	// 3.返回token
      const jwt = require("jsonwebtoken");
  });
  ```

  

  