module.exports = app => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const router = express.Router();
  const Userlist = require("../../models/Userlist");
  const AdminUser = require("../../models/AdminUser");

  router.get("/userinfo", async (req, res) => {
    const model = await Userlist.find().limit(10);
    res.send(model);
  });
  router.post("/", async (req, res) => {
    //建立一条数据
    const model = await req.model.create(req.body);
    res.send(model);
  });
  router.put("/:id", async (req, res) => {
    //通过id找到并修改数值
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.delete("/:id", async (req, res) => {
    //通过id找到并修改数值
    const model = await req.model.findByIdAndDelete(req.params.id, req.body);
    res.send({ success: true });
  });
  router.get("/:id", async (req, res) => {
    //获取对应id的值
    const model = await req.model.findById(req.params.id);
    res.send(model);
  });
  router.get(
    "/",
    async (req, res, next) => {
      console.log(req.headers.authorization);

      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      console.log(token);
      console.log(tokenData);
      assert(token, 401, "请提供jwttoken");
      const { id } = jwt.verify(token, app.get("secret"));
      req.user = await AdminUser.findById(id);
      assert(req.user, 401, "请先登录");
      // const user = await
      await next();
    },
    async (req, res) => {
      //
      let queryOptions = {};
      if (req.model.modelName == "Category") {
        queryOptions.populate = "parent";
      }
      const model = await req.model
        .find()
        .setOptions(queryOptions)
        .limit(10);
      res.send(model);
    }
  );
  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      console.log(req.params.resource);

      const modelName = require("inflection").classify(req.params.resource);
      console.log(modelName);

      req.model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password");
    assert(user, 422, "用户不存在");
    // 2.校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    // 3.返回token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ id: user._id }, app.get("secret"));

    res.send({ token });
  });
  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
