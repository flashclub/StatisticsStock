module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const WebUser = require("../../models/web/WebUser");
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");

  //  登录校验中间件
  const authMiddleware = require("../../middleware/auth");
  //  获取资源中间件
  const resourceMiddleware = require("../../middleware/resource");

  

  app.use(
    "/web/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );
  router.get("/userinfo", async (req, res) => {
    console.log(req.app === app);
    
    const model = await req.model.find();
    const sendData = {
      message: "success",
      data: model
    };
    res.send(sendData);
  });
  app.post("/web/api/regisitor", async (req, res) => {
    const { username, password } = req.body;
    const user = await WebUser.findOne({ username });
    if (user) {
      return res.status(400).send({ message: "fail" });
    }
    const model = await WebUser.create(req.body);
    res.send({ message: "success" });
  });
  app.post("/web/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await WebUser.findOne({ username }).select("+password");

    assert(user, 422, "用户不存在");

    const isValid = require("bcrypt").compareSync(password, user.password);
    console.log(password, user.password, isValid);
    assert(isValid, 422, "密码错误");

    const token = jwt.sign({ id: user._id }, app.get("web-secret"));
    res.send({ token });
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
