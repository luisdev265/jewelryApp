import getProductIdQuery from "../querys/productQueries/getProductId.js";

const getProductId = async (productId) => {
  try {
    const product = await getProductIdQuery(productId);

    if (product.length === 0) return error("Product Not Found");

    return product;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export default getProductId;