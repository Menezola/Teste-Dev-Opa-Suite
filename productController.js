const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, description, amount, price, categories } = req.body;
    const newProduct = new Product({
      name,
      description,
      amount,
      price,
      categories,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar produto", error: error.message });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, amount, price, categories } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, amount, price, categories },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar produto", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar produto", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categories");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("categories");
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produto", error: error.message });
  }
};

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
