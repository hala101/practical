const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todo: [
      {
        type: Schema.Types.ObjectId,
        ref: "todo",
        required: true,
      },
    ],
    otp: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("user", userSchema);

/**
 * Find User by Details
 */

User.findUserByDetails = async (email = null) => {
  let condition = [];

  try {
    return await User.findOne({ email });
  } catch (error) {
    return new Error(error);
  }
};

User.updateUser = async ({ _id }, data) => {
  try {
    return await User.findOneAndUpdate({ _id }, data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = User;
