import "./Forms.css";
import DragAndDrop from "../Products/ProductsComponents/DragAndDrop/DragAndDrop";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  FormField,
  FormMapProps,
  FormProductProps,
} from "@/types/formPorduct";
import type { Category } from "@/types/categories";
import type { SubCategories } from "@/types/subCategories";
import { useCallback } from "react";
import { useEffect } from "react";

const FormMap = (props: FormMapProps) => {
  const { reloadAll } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategories[]>([]);
  const [LogError, setLogError] = useState<string>("");
  
  const formFields = props.formFields;
  const [images, setImages] = useState<File[]>([]);

  const url = import.meta.env.VITE_API_URL;

  //handle satate
  const setCategory = props.setSelectedCategory;

  const handleResponse = useCallback(async (): Promise<Category[]> => {
    try {
      const response = await fetch(`${url}/api/Categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch data");
      }

      setLogError("");

      const data = await response.json();
      setCategories(data);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [url]);

  const handleResponseSubCategories = useCallback(async (): Promise<SubCategories[]> => {
    try {
      const response = await fetch(`${url}/api/subCategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setLogError("Failed to fetch data");

      }

      setLogError("");
      const data = await response.json();
      setSubCategories(data.subCategories);
      console.log(data.subCategories);
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [url] );

  useEffect(() => {
    handleResponse();
    handleResponseSubCategories();
  }, [handleResponse, handleResponseSubCategories]);

  const [dataForm, setDataForm] = useState<FormProductProps>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productStock: 0,
  });

  console.log(dataForm.productName);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategory(parseInt(value));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      if (dataForm.productName && dataForm.productName !== props.productName) {
        formData.append("productName", dataForm.productName);
      }
      if (
        dataForm.productDescription &&
        dataForm.productDescription !== props.productDescription
      ) {
        formData.append("productDescription", dataForm.productDescription);
      }
      if (
        dataForm.productPrice &&
        dataForm.productPrice !== props.productPrice &&
        dataForm.productPrice !== 0
      ) {
        formData.append("productPrice", dataForm.productPrice.toString());
      }
      if (
        dataForm.productStock &&
        dataForm.productStock !== props.productStock &&
        dataForm.productStock !== 0
      ) {
        formData.append("productStock", dataForm.productStock.toString());
      }

      console.log(dataForm); // Aquí puedes enviar el formData al servidor para procesar el formulario

      const ApiUrl = import.meta.env.VITE_API_URL;
      let sendImages = "";
      let sendName = "";
      if (images.length > 0) {
        sendImages = "true";
        sendName = props.productName;
      }

      console.log(sendImages);
      console.log(sendName);

      console.log(dataForm);

      const res = await fetch(
        `${ApiUrl}/api/products/${props.idProduct}?images=${sendImages}&nameImage=${sendName}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Error al enviar el formulario");
      }

      reloadAll();

      const data = res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {formFields.map((field: FormField) => {
        return (
          <div key={field.id} className="flex flex-col gap-2">
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              name={field.name}
              className="h-10 rounded-md border px-3 focus:border-gray-400 outline-none"
              defaultValue={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDataForm({
                  ...dataForm,
                  [field.field]: e.target.value,
                  // Agrega esta línea para verificar el estado del formulari
                });
              }}
            />
          </div>
        );
      })}
      <div className="flex flex-col gap-2">
      <label htmlFor="Category">Category</label>
        <select name="category" id="category" onChange={handleSelect} className="h-10 rounded-md border px-3 focus:border-gray-400 outline-none hover:cursor-pointer">
          {LogError ? (
            <p className="text-red-600 text-lg">Error al optener categorias</p>
          ) : (
            categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <div className="flex flex-col gap-2">
      <label htmlFor="Subcategory">Subcategory</label>
        <select name="Subcategory" id="Subcategory" className="h-10 rounded-md border px-3 focus:border-gray-400 outline-none hover:cursor-pointer">
          {LogError ? (
            <p className="text-red-600 text-lg">Error al optener categorias</p>
          ) : (
            subCategories.map((subcategory) => {
              if (subcategory.category_id === props.selectedCategory) {
                return (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                );
              }
            })
          )}
        </select>
      </div>
      <DragAndDrop setImages={setImages} />
      <Button className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600">
        Update
      </Button>
    </form>
  );
};

export default FormMap;
