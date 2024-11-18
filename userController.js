const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Cadastro
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username e password são obrigatórios" });
  }

  try {
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username e password são obrigatórios" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
