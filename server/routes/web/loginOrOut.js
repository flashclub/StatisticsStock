module.exports = app => {
  const WebUser = require("../../models/web/WebUser");
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");
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
    assert(isValid, 422, "密码错误");

    const token = jwt.sign({ id: user._id }, app.get("web-secret"));
    res.send({ token });
  });
};
