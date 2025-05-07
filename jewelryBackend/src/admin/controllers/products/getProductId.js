import getProductId from "../../models/getProductId.js";

const getProductIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductId(id);
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export default getProductIdController;