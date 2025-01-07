const jwt = require("jsonwebtoken");

const authMiddleware = (resolver) => {
  return async (parent, args, context) => {
    const { req } = context;
    try {
      const token = req.cookies.authToken;
      if (!token) {
        throw new Error("Unauthorized: No token provided");
      }
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRECT);
      context.user = decoded.user;
      return resolver(parent, args, context);
    } catch (error) {
      throw new Error("Unauthorized: Invalid token");
    }
  };
};

module.exports = authMiddleware;
