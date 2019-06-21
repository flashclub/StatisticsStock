module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Userlist = require("../../models/Userlist");
  const Category = require("../../models/Category");
  router.get("/userinfo", async (req, res) => {
    const model = await Userlist.find().limit(10);
    res.send(model);
  });
  router.post("/categories", async (req, res) => {
    //建立一条数据
    const model = await Category.create(req.body)
    res.send(model);
  });
  router.put("/categories/:id", async (req, res) => {
    //通过id找到并修改数值
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.get("/categories/:id", async (req, res) => {
    //获取对应id的值
    const model = await Category.findById(req.params.id);
    res.send(model);
  });
  router.get("/categories", async (req, res) => {
    //
    const model = await Category.find().limit(10);
    res.send(model);
  });
  app.use("/admin/api", router);
};
