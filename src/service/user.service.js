const User = require("../models/User");

const checkIsUserExist = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return null;
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
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return null;
  }
}

const findUserById = async (id) => {
  try {
    const user = User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  checkIsUserExist,
  saveUser,
  getAllUsers,
  findUserById,
};
