import getAllModel from "../../models/subCategories/getAll.js";

const getAllController = async (req, res) => {
  try {
    const subCategories = await getAllModel();

    return res.status(200).json({subCategories});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllController;