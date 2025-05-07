import createProductModel from "../../models/createProduct/createProduct.js";

const createProductController = async  (req, res) => {
    try {
        const productData = req.body;
        const files = req.files; // Array de archivos subidos
        const product = await createProductModel(productData, files);

        res.status(201).json({ message: 'Product created successfully', product }); // 201 Created
    } catch (e) {
        res.status(500).json({ message: e.message }); // 500 Internal Server Error
    }
}

export default createProductController;