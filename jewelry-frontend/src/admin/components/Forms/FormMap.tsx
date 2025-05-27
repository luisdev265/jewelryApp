import "./Forms.css";
import DragAndDrop from "../Products/ProductsComponents/DragAndDrop/DragAndDrop";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type {
  FormField,
  FormMapProps,
  FormProductProps,
} from "@/types/formPorduct";

const FormMap = (props: FormMapProps) => {
  const { reloadAll } = props;

  const [dataForm, setDataForm] = useState<FormProductProps>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productStock: 0,
  });

  console.log(dataForm.productName);

  const formFields = props.formFields;
  const [images, setImages] = useState<File[]>([]);

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
      if (dataForm.productPrice && dataForm.productPrice !== props.productPrice && dataForm.productPrice !== 0) {
        formData.append("productPrice", dataForm.productPrice.toString());
      }
      if (dataForm.productStock && dataForm.productStock !== props.productStock && dataForm.productStock !== 0) {
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
      <DragAndDrop setImages={setImages} />
      <Button className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600">
        Update
      </Button>
    </form>
  );
};

export default FormMap;
