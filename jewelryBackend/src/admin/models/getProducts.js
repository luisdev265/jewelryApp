import getProductsQuery from "../querys/productQueries/getProduct.js";
import { error } from "../../utils/throwError.js";

const getProductsModel = async () => {
    try {
        const products = await getProductsQuery();

        return products;
    } catch (err) {
        console.error(err.message);
        throw error;
    }
}

export default getProductsModel;