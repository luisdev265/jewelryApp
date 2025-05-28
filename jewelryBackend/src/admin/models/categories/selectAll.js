import selectAllQuery from "../../querys/categories/selectAll.js"

const selectAllModel = async () => {
  try {
    const categories = await selectAllQuery();

    return categories;
  } catch (error) {
    console.error("Error selecting all categories:", error);
    throw error;
  }
};

export default selectAllModel;