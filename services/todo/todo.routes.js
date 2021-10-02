var express = require("express");
var router = express.Router();

const validation = require("./todo.validation");
const controller = require("./todo.controller");

router.post("/addTodo", validation.add, controller.add);

// router.get("/", controller.get);

router.get("/getList", controller.getList);

router.get("/getTodo/:id", controller.get);

router.get("/getTodoByUserId/:user_id", controller.getTodoByUserId);

router.put("/update/:id", controller.update);

router.delete("/delete/:id", controller.delete);

router.delete("/deleteByUserId/:user_id", controller.deleteTodoByUserId);

module.exports = router;
