const bcrypt = require("bcrypt");
const {
  generateTokens,
  saveToken,
  validateRefreshToken,
  validateAccessToken,
  removeToken,
  findToken,
} = require("../../service/token.service");
const {
  checkIsUserExist,
  saveUser,
  findUserById,
} = require("../../service/user.service");
const UserDto = require("../../dtos/user.dto");
const { PASSWORD_NOT_PROVIDED } = require("../../constants/errors");

const signup = async (request, response) => {
  try {
    const { email, password, role } = request.body;

    const isUserExist = await checkIsUserExist(email);

    if (isUserExist) {
      return response
        .status(404)
        .send({ message: `User with this email: ${email} already exists.` });
    }

    if (!password) {
      throw new Error(PASSWORD_NOT_PROVIDED);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await saveUser(email, hashPassword, role);
    const userDto = new UserDto(user);

    const { refreshToken, accessToken } = await generateTokens({ ...userDto });

    const isRefreshTokenValid = await validateRefreshToken(refreshToken);
    const isAccessTokenValid = await validateAccessToken(accessToken);

    if (!isRefreshTokenValid) {
      return response.status(500).send({ message: "Refresh token not valid" });
    }

    if (!isAccessTokenValid) {
      return response.status(500).send({ message: "Access token not valid" });
    }

    await saveToken(userDto.id, refreshToken);

    response.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
    });

    response.status(200).send({
      refreshToken,
      accessToken,
      userDto,
    });
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const signin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await checkIsUserExist(email);

    if (!user) {
      return response
        .status(404)
        .send({ message: `User with this email: ${email} was not found.` });
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      return response.status(404).send({ message: "Incorrect password" });
    }

    const userDto = new UserDto(user);

    const { refreshToken, accessToken } = await generateTokens({ ...userDto });

    await saveToken(userDto.id, refreshToken);

    response.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    response.status(200).send({
      refreshToken,
      accessToken,
      userDto,
    });
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const logout = async (request, response) => {
  try {
    const { refreshToken } = request.cookies;
    const token = await removeToken(refreshToken);
    response.clearCookie("refreshToken");
    response.status(200).send({
      token,
    });
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

const refresh = async (request, response) => {
  try {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return response
        .status(404)
        .send({ message: "Token was not found in cookies" });
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      return response.status(404).send({ message: "Token not valid" });
    }
    const user = await findUserById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await generateTokens({ ...userDto });
    await saveToken(userDto.id, tokens.refreshToken);
    response.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.status(200).send({
      ...tokens,
      userDto,
    });
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

module.exports = {
  signup,
  signin,
  logout,
  refresh,
};
