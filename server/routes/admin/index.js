module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Userlist = require("../../models/Userlist");
  const Category = require("../../models/Category");
  router.get("/userinfo", async (req, res) => {
    const model = await Userlist.find().limit(10);
    res.send(model);
  });
  router.post("/", async (req, res) => {
    //建立一条数据
    const model = await Category.create(req.body)
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
    res.send({success:true});
  });
  router.get("/:id", async (req, res) => {
    //获取对应id的值
    const model = await req.model.findById(req.params.id);
    res.send(model);
  });
  router.get("/", async (req, res) => {
    //
    let queryOptions = {}
    if (req.model.modelName == 'Category') {
      queryOptions.populate = 'parent';
    } 
    const model = await req.model.find().setOptions(queryOptions).limit(10);
    res.send(model);
  });
  app.use("/admin/api/rest/:resource",async (req,res,next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    console.log(modelName);
    
    req.model = require(`../../models/${modelName}`)
    next()
  }, router);
};
