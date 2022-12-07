const { getAllUsers } = require("../../service/user.service");

const getUsersController = async (request, response) => {
  try {
    const users = await getAllUsers();
    response.status(200).send(users);
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

module.exports = {
  getUsersController,
};
