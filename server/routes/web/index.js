module.exports = app => {
  const express = require("express");
  const router = express.Router();
  router.get("/userinfo", async (req, res) => {
      const sendData = {
        code: "000",
        message: "success",
        data: [
          {
            agency: "fuchang",
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15
          },
          {
            agency: "fuchang",
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15
          },
          {
            agency: "fuchang",
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15
          },
          {
            agency: "huasheng",
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15
          },
          {
            agency: "huasheng",
            id: "12987126",
            name: "王小虎",
            amount1: "539",
            amount2: "4.1",
            amount3: 15
          }
        ]
      }
      res.send(sendData);
  });
  app.use("/web/api/:resource", 
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.model = require(`../../models/${modelName}`);
      next();
    },
    router
  );
};
