import deleteProductModel from "../../models/deleteProduct.js";

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { imgs, type } = req.query;

    const product = await deleteProductModel(id, type, imgs);

    res.status(200).json({ message: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export default deleteProductController;