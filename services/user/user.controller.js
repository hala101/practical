const services = require("./user.service");
const { commonResponse, guard } = require("../../helper/");

module.exports = {
  login: async (req, res) => {
    console.log("Data => ", req.body);
    try {
      req.body.email = req.body.email.toLowerCase();

      const data = await services.login(req.body);
      if (data.success) {
        let response = {};
        const token = guard.createUserToken(data.data);
        response.token = token.token;

        return commonResponse.success(res, response, data.message);
      }
      return commonResponse.notFound(res, data.message);
    } catch (error) {
      console.log("Error Login =>", error);
      return commonResponse.sendUnexpected(res, error);
    }
  },
  get: async (req, res, next) => {
    console.log("Get Payload", req.query);
    try {
      let data = await services.get(req.params);

      if (data) {
        return commonResponse.success(res, data, "DEFAULT");
      }
      return commonResponse.notFound(res, "USER_NOT_FOUND");
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      let data = await services.forgotPassword(req.body);

      if (data) {
        return commonResponse.success(res, data, "CHECK_EMAIl");
      }
      return commonResponse.notFound(res, "USER_NOT_FOUND");
    } catch (error) {
      return commonResponse.notFound(res, error);
    }
  },
  changePasswordByOTP: async (req, res, next) => {
    try {
      let data = await services.changePasswordByOTP(req.body);

      if (data) {
        return commonResponse.success(res, data, "CHANGE_PASSWORD");
      }
      return commonResponse.notFound(res, "USER_NOT_FOUND");
    } catch (error) {
      return commonResponse.notFound(res, error);
    }
  },
  getList: async (req, res, next) => {
    try {
      let list = await services.list();

      list.map((iteration) => {
        //console.log("Iteration", iteration);
        console.log(
          "Fetched Email => ",
          iteration.business_id
            ? iteration.business_id.business_name
            : "Business Not Found"
        );
      });
      res.json(list);
    } catch (error) {
      console.log(error);
    }
  },
  add: async (req, res, next) => {
    console.log("User => add =>", req.body);
    try {
      let data = await services.add(req.body);
      if (data.success) {
        return commonResponse.success(res, data.data, data.message);
      }
      return commonResponse.notFound(res, data.message);
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res, next) => {
    console.log("User => update =>", req.body);
    try {
      let user = await services.update(req.params, req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      let user = await services.delete(req.params.id);
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const userData = req.body;
      userData.id = req.user.id;
      const data = await services.changePassword(userData);

      if (data.success) {
        return commonResponse.success(res, data.data, data.message);
      }
      return commonResponse.notFound(res, data.message);
    } catch (err) {
      return commonResponse.sendUnexpected(res, err);
    }
  },
};
