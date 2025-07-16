const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET_TOKEN;
const jwt = require("jsonwebtoken");

module.exports.verifyToken = function (req, res, next) {
  let { authorization } = req.headers; 
  console.log("Authorization Header:", authorization); 

  if (!authorization) return res.status(400).send({ message: "No token provided." });

  // Remove "Bearer " prefix
  if (authorization.startsWith("Bearer ")) {
    authorization = authorization.slice(7); // Remove the first 7 characters ("Bearer ")
  }
  console.log("Authorization",authorization);
console.log(jwtSecret)
  jwt.verify(authorization, jwtSecret, function (err, decoded) {
    if (err || !decoded) {
      console.log("Yha tk to aaya")
      return res.status(401).send({
        message: "User session expired or token is invalid. Please login again!",
      });
    } else {
      console.log("Decoded Token:", decoded); // Log the decoded token to inspect its structure

      if (!decoded.user || !decoded.user.email) {
        return res.status(401).send({
          message: "Token does not contain user information or email.",
        });
      }

      console.log("Decoded Email:", decoded.user.email); // Log the email from the decoded token

      req.email = decoded.user.email;
      req.name = decoded.user.name;
      req.id = decoded.user.id;

      // Check token expiration
      const expirationTime = new Date(decoded.exp * 1000); // Convert seconds to milliseconds
      const currentTime = new Date();

      if (currentTime > expirationTime) {
        return res.status(401).send({ message: "Token has expired" });
      }

      next();
    }
  });
};
