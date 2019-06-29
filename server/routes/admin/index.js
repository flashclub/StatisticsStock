module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
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
  router.get("/", async (req, res) => {
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
  });
  //  登录校验中间件
  const authMiddleware = async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请提供jwt token");

    const { id } = jwt.verify(token, app.get("secret"));
    assert(id, 401, "无效的jwt token");

    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware,
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password");
    console.log("73", user);

    assert(user, 422, "用户不存在");
    // 2.校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"));

    res.send({ token });
  });
  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
