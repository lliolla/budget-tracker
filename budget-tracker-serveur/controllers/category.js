const Category = require('../models/category');



exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

exports.createCategory = async (req, res) => {
  const { userId, budget, title } = req.body;

  try {
    const newCategory = new Category({
        userId, 
        budget,
        title
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
  exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
        res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 