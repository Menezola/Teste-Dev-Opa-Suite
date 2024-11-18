const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash da senha antes de salvar
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar a senha
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Método para gerar o JWT
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = mongoose.model("User", UserSchema);
