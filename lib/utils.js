const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    try {
      const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: "Token no es válido" });
    }
  }
};

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "3m",
    });
  }

  return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "1m" });
};

module.exports = { verifyToken, generateToken };
