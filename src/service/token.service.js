const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const {
  accessJwtSecret,
  refreshJwtSecret,
  maxAgeAccess,
  maxAgeRefresh,
} = require("../config/config");

const generateTokens = async (payload) => {
  try {
    const accessToken = jwt.sign(payload, accessJwtSecret, {
      expiresIn: maxAgeAccess,
    });
    const refreshToken = jwt.sign(payload, refreshJwtSecret, {
      expiresIn: maxAgeRefresh,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log(error);
  }
};

const saveToken = async (userId, refreshToken) => {
  try {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, accessJwtSecret);
    return userData;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, refreshJwtSecret);
    return userData;
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateTokens,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
};
