const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "unauthorized" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // verify
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decodedPayload;
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token" });
  }
};

// generate JWT token function
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign({ userData }, process.env.JWT_SECRETKEY, {
    expiresIn: 30000,
  });
};

module.exports = {
  jwtAuthMiddleware,
  generateToken,
};
