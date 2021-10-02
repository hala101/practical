const Todo = require("./todo.model");
const userServices = require("../user/user.service");

exports.add = async (data) => {
  try {
    let newTodo = new Todo(data);
    let todo = await newTodo.save();

    await userServices.addTodo(data.user_id, todo._id);

    return todo;
  } catch (error) {
    console.log(error);
  }
};

exports.listTodoWithSearchAndPagination = async (userId, query) => {
  const { search, limit, offset } = query;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(search);

  const list = await Todo.find({
    user_id: userId,
    $or: [
      { title: { $regex: searchRgx, $options: "i" } },
      { description: { $regex: searchRgx, $options: "i" } },
    ],
  })
    .limit(parseInt(limit))
    .skip(parseInt(offset));

  return list;
};

exports.get = async (query) => {
  try {
    return await Todo.findById(query.id).populate("user_id").lean();
  } catch (error) {
    console.log(error);
  }
};

exports.list = async () => {
  try {
    return await Todo.find().populate("user_id").lean();
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (query, data) => {
  console.log("query", query.id);
  console.log("data", data);
  try {
    let todo = await Todo.findOneAndUpdate({ _id: query.id }, data, {
      new: true,
    });
    console.log("Update Todo", todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (_id) => {
  try {
    let todo = await Todo.findOneAndDelete({ _id });
    console.log("Update Business", todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
};
exports.deleteTodoWithUserID = async (user_id) => {
  try {
    let todo = await Todo.deleteMany({ user_id });
    console.log("Delete Todo", todo);
    return todo;
  } catch (error) {
    console.log(error);
  }
};
