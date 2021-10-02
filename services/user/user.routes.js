var express = require("express");
var router = express.Router();
const { commonResponse, guard } = require("../../helper/");
const validation = require("./user.validation");
const controller = require("./user.controller");

router.post("/", validation.add, controller.add);

router.get("/get/:id", controller.get);

router.post("/login", validation.login, controller.login);

router.post("/forgot", controller.forgotPassword);

router.post(
  "/changePasswordByOTP",
  validation.changePasswordByOTP,
  controller.changePasswordByOTP
);

router.post(
  "/change-password",
  validation.changePassword,
  guard.isAuthorized(["user"]),
  controller.changePassword
);

router.get("/getList", controller.getList);

router.put("/update/:id", validation.add, controller.update);

router.delete("/delete/:id", controller.delete);

router.use((req, res) => {
  if (!res.route) {
    commonResponse.notFound(res, "NOT_FOUND");
  }
});

module.exports = router;
