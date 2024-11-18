const Category = require("../models/category");
const Product = require("../models/product");

const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar categorias e produtos",
      error: error.message,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ categories: categoryId }).populate(
      "categories"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar produtos da categoria",
      error: error.message,
    });
  }
};

module.exports = { getCategoriesWithProducts, getProductsByCategory };
