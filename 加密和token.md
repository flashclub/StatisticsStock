加密和token





## token逻辑

只能根据用户名去找：

因为密码已经被散列加密了，如果将密码再散列一次，依然和之前散列的不通，所以无法根据密码找

### 1.根据用户名找用户

### 2.校验密码

bcrypt 密码散列

### 3.返回token

> 涉及依赖：mongoose bcrypt jsonwebtoken http-assert express

<h1>登录逻辑：</h1>

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
  import Vue from "vue";
  import router from "./router"
  
  const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
  });
  ```

- 3.服务端：添加登录页接口：server-->routes-->admin-->index.js

  ```javascript
  module.exports = app =>{
      //	生成token的插件
      //	文档：https://www.npmjs.com/package/jsonwebtoken
      const jwt = require("jsonwebtoken");
      //	http错误处理插件
      const assert = require("http-assert");
  
      const AdminUser = require("../../models/AdminUser");
  
      app.post("/admin/api/login", async (req, res) => {
          // 0.将所有请求的内容赋值给username和password，需要做app.use(express.json())处理
          const { username, password } = req.body;
          // 1.根据用户名找用户 +password是因为查表默认不带出password字段，而这里需要
          const user = await AdminUser.findOne({ username }).select("+password");
          assert(user, 422, "用户不存在");
          // 2.校验密码
          const isValid = require("bcrypt").compareSync(password, user.password);
          assert(isValid, 422, "密码错误");
          // 3.返回token，使用user._id和预先定义的字符串生成token
          const token = jwt.sign({ id: user._id }, app.get("secret"));
          res.send({ token });
      });
  }
  ```

  由于上面用到了`app.get("secret")`（这里需要注意的是express多参数使用时.get的功能），所以需要先设置，在server-->index.js中：

  ```javascript
  const express = require('express')
  const app = express()
  
  app.use(require('cors')())			//  使用跨域模块
  app.use(express.json())				//	将前端给后端的数据转成json格式，否则没有req.body
  app.set('secret','fdfdashjkhu')		//  这里设置的字符串可以是任意的
  require('./plugins/db')(app)
  require('./routes/admin')(app)
  
  app.listen(3000,()=>{
    console.log('http://localhost:3000');
  })
  ```

  到这里就已经做好了登录模块的内容：用户校验，密码校验，生成token，接下来将每个接口使用token作为请求头，使得只有在token校验通过之后才能请求其他接口

- 4.服务端：添加中间件server-->routes-->admin-->index.js

  ```javascript
  const authMiddleware = async (req, res, next) => {
      const token = String(req.headers.authorization || "").split(" ").pop();
      assert(token, 401, "请提供jwt token");
      
      const { id } = jwt.verify(token, app.get("secret"));
      assert(id, 401, "无效的jwt token");
  
      req.user = await AdminUser.findById(id);
      assert(req.user, 401, "请先登录");
      await next();
  };
  ```

  然后在所有请求的中间添加：

  ```javascript
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware,
    async (req, res, next) => {
      // inflection是一个类似babel的模块，.classify可以将复数单词转为单数
      //详见https://www.helplib.com/GitHub/article_94504
      const modelName =     require("inflection").classify(req.params.resource);
      req.model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  ```

- 5.前端添加请求头admin-->src-->http.js

  ```javascript
  http.interceptors.request.use(
    function(config) {
      // 如果有token 就设置 Authorization
      localStorage.token &&
        (config.headers.Authorization = "Bearer " + localStorage.token || "");
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  ```

  拦截所有错误：

  ```javascript
  http.interceptors.response.use(
    res => {
      return res;
    },
    err => {
      console.log(err.response.data);
      if (err.response.data.message) {
        Vue.prototype.$message({
          type: "error",
          message: err.response.data.message
        });
        if (err.response.status == 401) {
          router.push('/login')
        }
      }
      return Promise.reject(err);
    }
  );
  ```



至此接口验证token的逻辑也写好了。

对于一名前端来说，做完上面5步就基本没什么复杂内容了，后面还差用户注册步骤，但是上面的步骤掌握了注册也不是什么难事了。

参考文档:

[JSON Web Token 入门教程](<http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html>)

[jsonwebtoken](<https://www.npmjs.com/package/jsonwebtoken>)

[inflection](<https://www.npmjs.com/package/inflection>)