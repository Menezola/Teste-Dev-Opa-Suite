const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar categoria", error: error.message });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar categoria", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar categoria", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar categorias", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar categoria", error: error.message });
  }
};

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
