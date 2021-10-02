const User = require("./user.model");
const TodoServices = require("../todo/todo.service");
const bcrypt = require("bcryptjs");

const validPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

const isExist = async (email) => {
  return await User.findUserByDetails(email);
};

exports.login = async (data) => {
  let existData = await User.findUserByDetails(data.email);

  if (!existData) {
    return {
      success: false,
      data: {},
      message: "USER_NOT_FOUND",
    };
  }

  if (
    !validPassword(data.password, existData.password ? existData.password : "")
  ) {
    return {
      success: false,
      message: "INVALID_EMAIL_PASSWORD",
      data: existData,
    };
  }

  return {
    success: true,
    data: existData,
    message: "LOGIN_SUCCESS",
  };
};

exports.add = async (data) => {
  try {
    let userExist = await isExist(data.email);
    if (userExist) {
      return {
        success: false,
        data: userExist,
        message: "USEREMAIL_EXISTS",
      };
    }

    if (typeof data.password !== "undefined") {
      data.password = bcrypt.hashSync(
        data.password,
        bcrypt.genSaltSync(4),
        null
      );
    }

    let newUser = new User(data);
    let user = await newUser.save();

    return {
      success: true,
      data: user,
      message: "ADD_USER",
    };
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (query) => {
  try {
    return await User.findOne({ _id: query.id }).populate("todo").lean();
  } catch (error) {
    console.log(error);
  }
};

exports.list = async () => {
  try {
    return await User.find().populate("todo").lean();
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (query, data) => {
  try {
    let user = await User.findOneAndUpdate(query.id, data, { new: true });
    console.log("Update User", user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (_id) => {
  try {
    let user = await User.findOneAndDelete({ _id });
    console.log("Update User", user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (data) => {
  let existUser = await User.findById(data.id);

  if (!existUser) {
    return {
      success: false,
      message: "USER_NOT_EXIST",
      data: {},
    };
  } else if (
    !validPassword(
      data.old_password,
      existUser.password ? existUser.password : ""
    )
  ) {
    return {
      success: false,
      message: "INVALID_OLD_PASSWORD",
      data: {},
    };
  }

  let updateData = {
    password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(4), null),
  };

  const updatedInfo = await User.updateUser(existUser, updateData);
  if (updatedInfo) {
    return { success: true, data: existUser, message: "CHANGE_PASSWORD" };
  }
};

exports.forgotPassword = async (data) => {
  let existUser = await User.findOne({ email: data.email }).lean();
  if (!existUser) {
    throw "USER_NOT_EXIST";
  }
  let updateData = { otp: "000000" };

  return await User.updateUser(existUser, updateData);
};

exports.changePasswordByOTP = async (data) => {
  let existUser = await User.findOne({ email: data.email }).lean();

  if (!existUser) {
    throw "USER_NOT_EXIST";
  }
  console.log(data.otp, existUser.otp);
  if (!existUser.otp || data.otp != existUser.otp) {
    throw "INVALID_OTP";
  }

  let updateData = {
    password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(4), null),
    otp: null,
  };

  await await User.findOneAndUpdate(
    { OTP: { $exists: true } },
    { $unset: { OTP: 1 } }
  );
  return await User.updateUser(existUser, updateData);
};

exports.addTodo = async (userId, todoId) => {
  try {
    let existUser = await User.findById(userId);
    existUser.todo.push(todoId);
    existUser.save();
  } catch (error) {
    return new Error(error);
  }
};
