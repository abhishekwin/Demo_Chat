const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware function to check token expiration
exports.checkTokenExpirationAndVerification = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization?.split(" ")[1]; // Assuming token is sent in the "Authorization" header

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decode = jwt.verify(token, secretKey); // Replace with your secret key
    const expirationTime = decode.exp;

    if (Date.now() >= expirationTime * 1000) {
      return res.status(401).json({ message: "Token has expired" });
    }
    req.decode = decode;
    // Token is valid, continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid" });
  }
};
