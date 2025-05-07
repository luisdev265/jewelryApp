import getProductsModel from "../../models/getProducts.js";

const getProductController = async (req, res) => {
    try {
        const products = await getProductsModel();

        res.status(200).json({message: "Products Successfully Obtained", products: products});
    } catch (err) {
        res.status(500).json({error: "Failed To Obtain Prodcuts", message: err.message});
    }
}

export default getProductController;