const Category = require('../models/category');
const mongoose = require('mongoose');


exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ category, success: true });
  } catch (error) {
    res.status(500).json({success: false, error: error.message });
  }
};

exports.getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({success: false, error: error.message });
    }
  }; 

  exports.createCategory = async (req, res) => {
    const { budget, title } = req.body;
  
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);

      const newCategory = new Category({
        userId: id,
        budget,
        title
      });
  
      const savedCategory = await newCategory.save();
      res.status(201).json({ savedCategory, success: true });
    } catch (error) {
      res.status(400).json({success: false, error: error.message });
    }
  };
  exports.updateCategory = async (req, res) => {
    let id=req.params.id
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ error: "La categorie n'hexiste pas", success: false });
      }
      res.status(200).json({ category, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "La categorie n'héxiste pas", success: false });
    }
    res.status(200).json({ category, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
  }; 
  