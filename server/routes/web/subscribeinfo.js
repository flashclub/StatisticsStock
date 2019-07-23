module.exports = app => {
  // const express = ;
  const router = require("express").Router();
  //  登录校验中间件
  const authMiddleware = require("../../middleware/auth");
  //  获取资源中间件
  const resourceMiddleware = require("../../middleware/resource");
  app.use(
    "/web/api/rest/:resource",
    authMiddleware({ whichModels: "WebUser" }),
    resourceMiddleware(),
    router
  );
  router.post("/subscribeinfo", async (req, res) => {
    //  上传用户申购信息
    console.log(req.user);

    let insertData = {
      username: req.user.username,
      data: []
    };
    let userData = {
      code: req.body.code,
      broker: req.body.broker,
      account: req.body.account,
      handNumber: req.body.handNumber
    };
    const model = await req.model.findOne({ username: req.user.username });
    if (model) {
      let finalData = model.data;
      finalData.push(userData);
      const models = await req.model.findOneAndUpdate(
        { username: req.user.username },
        { $set: { data: finalData } },
        { new: true }
      );
    } else {
      insertData.data.push(userData);
      const models = await req.model.create(insertData);
    }
    const sendData = {
      message: "success",
      data: [],
      status: 1
    };
    res.send(sendData);
  });
};
