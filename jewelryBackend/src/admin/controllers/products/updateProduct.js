import updateProductModel from "../../models/updateProduct.js";

const updateProductController = async ( req, res ) => {
    try {
        const productData = {...req.body};
        const files = req.files;
        const { id } = req.params;
        const { images } = req.query;

        const updateProductFinally = await updateProductModel(productData, id, files, images);
        res.status(200).json({message: "Product Updated Succssesfully", responses: updateProductFinally});
    } catch (err) {
        res.status(500).json({message: "Something Went Wrong", error: err.message})
    }
}

export default updateProductController;