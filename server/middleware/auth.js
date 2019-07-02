module.exports = options => {
  return async (req, res, next) => {
    
    const WebUser = require("../models/web/"+options.whichModels);
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请提供jwt token");

    const { id } = jwt.verify(token, req.app.get("web-secret"));
    assert(id, 401, "无效的jwt token");

    req.user = await WebUser.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
