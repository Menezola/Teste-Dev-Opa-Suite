const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }
  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido", error: error.message });
  }
};

module.exports = { protect };
