import selectAllModel from "../../models/categories/selectAll.js";

const selectAllController = async (req, res) => {
  try {
    const categories = await selectAllModel();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default selectAllController;