import Cards from "./Cards";
import type { Product } from "@/types/product";

interface CardsRenderProps {
  products: Product[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>; // función que recibe un boolean y no retorn
}

interface urls {
  img_id: number;
  img_url: string;
}

const CardsRender = ({ ...props }: CardsRenderProps) => {
  const products = props.products;
  const handleEditClick = (product: Product) => {
    props.setSelectedProduct(product);
    props.setShowModal(true);
  };

  return (
    <>
      {products.map((product) => {
        const urls = product.imagesJson;
        const urlObject: urls[] = JSON.parse(urls);
        const imageServerUrl = import.meta.env.VITE_IMG_SERVER_URL;
        const urls2 = urlObject.map(
          (url: urls) => `${imageServerUrl}${url.img_url}`
        );


        // Truncar la descripción para mostrar solo 10 palabras
        const description = product.productDescription;
        const descriptionParts = description.split(" ");
        const firstWord = descriptionParts[0];
        // Agregar la primera letra mayúscula a la primera palabra de la descripcion
        descriptionParts[0] = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
        const truncatedDescription = descriptionParts.slice(0, 10).join(" ") + "...";

        // Capitalizar la primera letra de cada palabra del título
        const title = product.productName;
        const titleParts = title.split(" ");
        const firstWordCapitalized = titleParts.map((word) => word.charAt(0).toUpperCase() + word.slice(1)); // capitalizamos la primera letra de cada palabra y las unimo
        const firstWordCapitalized2 = firstWordCapitalized.join(" "); // unimos las palabras

        return (
          <Cards
            key={product.productId}
            img={urls2[0]}
            title={firstWordCapitalized2}
            description={truncatedDescription}
            onEdit={() => handleEditClick(product)} // pasamos la función
            price={product.productPrice}
            stock={product.productStock}
          />
        );
      })}
    </>
  );
};

export default CardsRender;