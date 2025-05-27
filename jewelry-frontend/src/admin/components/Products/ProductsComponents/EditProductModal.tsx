import type { Product } from "@/types/product";
import FormMap from "../../Forms/FormMap";

interface Props {
  product: Product | null;
  onClose: () => void;
  reloadAll: () => Promise<Product[]>;
}

function EditProductModal({ ...props }: Props) {
  const { reloadAll, ...rest } = props;
  const { product, onClose } = rest;
  //Esto lo hacemos con el final de proteger el componente si dada casualidad recibe un null
  if (!product) return null;
  // Capitalizar la primera letra de cada palabra del título
  const title = product.productName;
  const titleParts = title.split(" ");
  const firstWordCapitalized = titleParts.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ); // capitalizamos la primera letra de cada palabra y las unimo
  const firstWordCapitalized2 = firstWordCapitalized.join(" "); // unimos las palabras

  // Capitalizar la primera letra de la descripcion
  const description = product.productDescription;
  const descriptionParts = description.split(" ");
  const firstWord = descriptionParts[0];
  // Agregar la primera letra mayúscula a la primera palabra de la descripcion
  descriptionParts[0] = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  const truncatedDescription = descriptionParts.join(" ");

  const formFields = [
    {
      id: `${product.productName}`,
      label: "Name",
      type: "text",
      name: product.productName,
      value: firstWordCapitalized2,
      field: "productName"
    },
    {
      id: product.productDescription,
      label: "Description",
      type: "text",
      name: product.productDescription,
      value: truncatedDescription,
      field: "productDescription"
    },
    {
      id: `${product.productPrice}`,
      label: "Price",
      type: "text",
      name: ` ${product.productPrice}`,
      value: `$ ${product.productPrice}`,
      field: "productPrice"

    },
    {
      id: `${product.productStock}`,
      label: "Stock",
      type: "text",
      name: `${product.productStock}`,
      value: `${product.productStock}`,
      field: "productStock"
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
        <FormMap
          formFields={formFields}
          reloadAll={reloadAll}
          idProduct={product.productId}
          productName={product.productName}
          productDescription={product.productDescription}
          productPrice={product.productPrice}
          productStock={product.productStock}
        ></FormMap>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:cursor-pointer text-lg"
        >
          x
        </button>
      </div>
    </div>
  );
}

export default EditProductModal;
