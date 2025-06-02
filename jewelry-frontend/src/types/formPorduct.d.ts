import type { Product } from "./product";

export interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  value?: string;
  field: string;
}

interface ProductMin {
  idProduct: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
}

export interface FormMapProps extends ProductMin {
  formFields: FormField[];
  selectedCategory: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
  reloadAll: () => Promise<Product[]>;
}

export interface FormProductProps {
  productName: string | undefined,
  productDescription: string | undefined,
  productPrice: number | undefined,
  productStock: number | undefined,
  categoryId: number | undefined,
  subCategoryId: number | undefined,
}
