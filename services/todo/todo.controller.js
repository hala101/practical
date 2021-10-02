const { commonResponse, guard } = require("../../helper/");
const services = require("./todo.service");

module.exports = {
  get: async (req, res, next) => {
    console.log("Get Payload", req.params);
    try {
      let data = await services.get(req.params);
      if (data) {
        return commonResponse.success(res, data, "DEFAULT");
      }
      return commonResponse.notFound(res, "DETAIL_NOT_FOUND");
    } catch (error) {
      console.log(error);
    }
  },

  getList: async (req, res, next) => {
    try {
      let list = await services.list();
      if (list.length > 0) {
        return commonResponse.success(res, list, "DEFAULT");
      }
      return commonResponse.notFound(res, "DETAIL_NOT_FOUND");
    } catch (error) {
      return commonResponse.notFound(res, "DETAIL_NOT_FOUND");
    }
  },

  getTodoByUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      let list = await services.listTodoWithSearchAndPagination(
        user_id,
        req.query
      );
      console.log("list ==> ", list);
      if (list.length > 0) {
        return commonResponse.success(res, list, "DEFAULT");
      }
      return commonResponse.notFound(res, "DETAIL_NOT_FOUND");
    } catch (error) {
      console.log(error);
    }
  },

  add: async (req, res, next) => {
    console.log("User => add =>", req.body);
    try {
      let user = await services.add(req.body);
      if (user) {
        return commonResponse.success(res, user, "DEFAULT");
      }
      return commonResponse.notFound(res, "DEFAULTERR");
    } catch (error) {
      console.log(error);
      return commonResponse.notFound(res, "DEFAULTERR");
    }
  },

  update: async (req, res, next) => {
    try {
      let user = await services.update(req.params, req.body);
      if (user) {
        return commonResponse.success(res, user, "DEFAULT");
      }
      return commonResponse.notFound(res, "DETAIL_NOT_FOUND");
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
  deleteTodoByUserId: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      let list = await services.deleteTodoWithUserID(user_id, req.query);
      res.json(list);
    } catch (error) {
      console.log(error);
    }
  },
};
