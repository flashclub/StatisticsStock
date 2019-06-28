module.exports = app => {
  const express = require("express");
  const router = express.Router();
  router.get("/userinfo", async (req, res) => {
    const model = await req.model.find();
    const sendData = {
      code: "000",
      message: "success",
      data: model
    };
    res.send(sendData);
  });
  router.get("/userinfo", async (req, res) => {
    const model = await req.model.create(req.body);

    
    res.send({message:'success'});
  });
  app.use(
    "/web/api/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      console.log("modelName", modelName);

      req.model = require(`../../models/web/${modelName}`);
      next();
    },
    router
  );
};
