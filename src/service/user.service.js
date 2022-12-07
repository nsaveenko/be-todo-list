const User = require("../models/User");

const checkIsUserExist = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const saveUser = async (email, password, role) => {
  try {
    const user = await User.create({
      email,
      password,
      role,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkIsUserExist,
  saveUser,
  getAllUsers,
};
