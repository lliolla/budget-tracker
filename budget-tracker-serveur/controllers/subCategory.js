const SubCategory = require('../models/subCategory');

exports.getAllSubCategory = async (req, res) => {
  try {
    const subcategorys = await SubCategory.find();
    res.json(subcategorys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.findById(req.params.id);
        res.json(subcategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

exports.createSubCategory = async (req, res) => {
  const { userId, categoryId, budget, title} = req.body;

  try {
    const newSubCategory = new SubCategory({
        categoryId, 
        userId, 
        budget, 
        title
    });

  newSubCategory.save();
    res.status(201).json({ message: 'Sous-catégorie crée avec succès'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteSubCategory = async (req, res) => {
    try {
      SubCategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sous-catégorie suprimée avec succès'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
  exports.updateSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
        res.json(subcategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 