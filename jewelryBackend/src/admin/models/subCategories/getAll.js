import selectAllQuery  from "../../querys/subCategories/getAll.js";

const getAllModel = async () => {
  try {
    const subCategories = await selectAllQuery();

    return subCategories;
  } catch (error) {
    console.error("Error selecting all categories:", error);
    throw error;
  }
};

export default getAllModel;