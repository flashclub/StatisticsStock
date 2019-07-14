module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const assert = require("http-assert");
  require("./loginOrOut")(app);
  const StockData = require("../../models/web/StockData");

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
  router.post("/basedata", async (req, res) => {
    //  申购基础信息
    const model = await req.model.find();
    let arr = [];       //处理后的选择列表
    let brokers = [
      {
        value: "futu",
        label: "富途"
      },
      {
        value: "zunjia",
        label: "尊嘉"
      },
      {
        value: "huasheng",
        label: "华盛"
      },
    ];   //券商
    let accounts = [];  //账户
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const ele = model[key];
        arr.push({
          value: ele.code,
          label: ele.company
        });
      }
    }
    const sendData = {
      message: "success",
      data: {companyList:arr,brokers,accounts}
    };
    res.send(sendData);
  });
  router.post("/subscribeinfo", async (req, res) => {
    //  上传用户申购信息
    let insertData = {
      username: req.user.username,
      data: []
    };
    let userData = {
      code: req.body.code,
      handNumber: req.body.handNumber
    };
    // insertData.data.push(req.body);
    const baseData = await StockData.findOne({ code: req.body.code });
    let base2 = JSON.parse(JSON.stringify(baseData));
    let newObj = Object.assign(userData, base2);
    delete newObj._id;
    insertData.data.push(newObj);

    const model = await req.model.findOne({ username: req.user.username });
    // assert(model,400,'没数据')
    // console.log(model);
    
    if (model) {
      console.log(model.data);
      let finalData = model.data;
      finalData.push(...insertData.data);
      const models = await req.model.findOneAndUpdate(
        { username: req.user.username },
        { $set: { data: finalData }},{new:true}
      );
    } else {
      // insertData.data.push(newObj);
      const models = await req.model.create(insertData);
    }

    // const model = await req.model.create(insertData);
    const sendData = {
      message: "success",
      data: [],
      status: 1
    };
    res.send(sendData);
  });
  //  用户录入的所有信息
  router.get("/userinfo", async (req, res) => {
    const model = await req.model.findOne({ username: req.user.username });
    let sendData = {};
    // console.log(model);

    if (model) {
      sendData.message = "success";
      sendData.data = model.data;
    } else {
      sendData.message = "success";
      sendData.data = [];
    }
    res.send(sendData);
  });

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ message: err.message });
  });
};
