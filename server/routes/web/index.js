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
  require("./subscribeinfo")(
    app,
    authMiddleware({ whichModels: "WebUser" }),
    resourceMiddleware()
  );
  let brokers = [
    {
      value: "zunjia",
      label: "尊嘉"
    },
    {
      value: "huasheng",
      label: "华盛"
    },
    {
      value: "lifumoer",
      label: "利弗莫尔"
    },
    {
      value: "futu",
      label: "富途"
    },
    {
      value: "jiufu",
      label: "玖富"
    },
    {
      value: "huili",
      label: "辉立"
    },
    {
      value: "laohu",
      label: "老虎"
    },
    {
      value: "fuchang",
      label: "富昌"
    }
  ]; //券商
  app.use(
    "/web/api/rest/:resource",
    authMiddleware({ whichModels: "WebUser" }),
    resourceMiddleware(),
    router
  );
  //  添加时 用户基础信息
  router.post("/basedata", async (req, res) => {
    console.log(req.user.username);

    const model = await req.model.find();
    let companyList = [];
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const ele = model[key];
        companyList.push({
          value: ele.code,
          label: ele.company
        });
      }
    }

    let accounts = []; //账户信息

    const sendData = {
      message: "success",
      data: { companyList, brokers, accounts }
    };
    res.send(sendData);
  });
  //  添加时 用户基础信息
  router.post("/basedata", async (req, res) => {
    console.log(req.user.username);

    const model = await req.model.find();
    let companyList = [];
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const ele = model[key];
        companyList.push({
          value: ele.code,
          label: ele.company
        });
      }
    }

    let accounts = []; //账户信息

    const sendData = {
      message: "success",
      data: { companyList, brokers, accounts }
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
