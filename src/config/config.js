const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  connectionString: process.env.DB_CONNECTION_STRING,
  accessJwtSecret: process.env.ACCESS_JWT_SECRET,
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
  maxAgeAccess: process.env.ACCESS_JWT_AGE,
  maxAgeRefresh: process.env.REFRESH_JWT_AGE,
};
