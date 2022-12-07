const bcrypt = require("bcrypt");
const {
  generateTokens,
  saveToken,
  validateRefreshToken,
  validateAccessToken,
} = require("../../service/token.service");
const { checkIsUserExist, saveUser } = require("../../service/user.service");

const signup = async (request, response) => {
  try {
    const { email, password, role } = request.body;

    const isUserExist = await checkIsUserExist(email);

    if (isUserExist) {
      return response
        .status(404)
        .send({ message: `User with this email: ${email} already exists.` });
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await saveUser(email, hashPassword, role);

    const { refreshToken, accessToken } = await generateTokens({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const isRefreshTokenValid = await validateRefreshToken(refreshToken);
    const isAccessTokenValid = await validateAccessToken(accessToken);

    if (!isRefreshTokenValid) {
      return response.status(500).send({ message: "Refresh token not valid" });
    }

    if (!isAccessTokenValid) {
      return response.status(500).send({ message: "Access token not valid" });
    }

    await saveToken(user._id, refreshToken);

    response.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
    });

    response.status(200).send({
      refreshToken,
      accessToken,
      user,
    });
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

module.exports = {
  signup,
};
