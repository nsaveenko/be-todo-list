const { validateAccessToken } = require("../service/token.service");

const verifyToken = (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return response.status(403).send({ message: "No token provided!" });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return response
      .status(401)
      .send({ message: "Unauthorized! Access token has expired!" });
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return response
      .sendStatus(401)
      .send({ message: "Unauthorized! Bad token" });
    }

    request.user = userData;
    next();
  } catch (error) {
    response.status(500).send(`Server error ${error}`);
  }
};

module.exports = verifyToken;
