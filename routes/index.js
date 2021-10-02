const { userRoute } = require("../services/user");
const { todoRoutes } = require("../services/todo");
const initialize = (app) => {
  app.use("/user", userRoute);
  app.use("/todo", todoRoutes);

  app.use("/authError", (req, res, next) => {
    return next(new Error("DEFAULT_AUTH"));
  });

  app.get("/ping", (req, res) => {
    res.status(200).send({
      success: true,
      statusCode: 200,
    });
  });
};

module.exports = { initialize };
