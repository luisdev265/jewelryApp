import React, { useRef, useState } from "react";
import type { DragAndDropEvent } from "@/types/dragAndDrop";
import ConditionalRender from "./ConditionalRender";
import { useEffect } from "react";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<File[]>>; // Agregamos setImages como prop her
}

const Container = ({...props}: Props) => {
  //Usamos el useState para guardar la preview de la imagen
  const [previews, setPreviews] = useState<string[]>([]);
  //Usamos el useRef para acceder al input file hidden
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  //Usamos el useState para guardar el evento del drag and drop
  const [DragEvent, setDragEvent] = useState<DragAndDropEvent>("");
  const MAX_FILES = 5; // Número máximo de archivos permitidos

  const { setImages } = props;

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (!files) return;

    const fileArray = Array.from(files);

    if (previews.length + fileArray.length > MAX_FILES) {
      alert(`Solo se permiten hasta ${MAX_FILES} archivos.`);
      return;
    }

    const validImages = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    const previewsArray = validImages.map((file) => URL.createObjectURL(file));
    setPreviews(previewsArray);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragEvent(e.type as DragAndDropEvent);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragEvent("");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const fileArray = Array.from(files);
    console.log(fileArray); // Usamos esta en vez de images
  
    if (previews.length + fileArray.length > MAX_FILES) {
      alert(`Solo se permiten hasta ${MAX_FILES} archivos.`);
      return;
    }
  
    const validImages = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );
  
    const previewsArray = validImages.map((file) =>
      URL.createObjectURL(file)
    );
  
    setImages(validImages); // Usamos solo las válidas
    setPreviews(previewsArray);
  };
  

  return (
    <div className="flex flex-col items-center w-80 h-auto bg-gray-100 rounded-sm hover:bg-gray-200 transition-all ease-in">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        className="w-full py-4 h-full border-2 border-dashed rounded-sm min-h-40 border-gray-400 flex flex-wrap gap-4 items-center justify-center text-center cursor-pointer"
      >
        {previews.length ? (
          previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))
        ) : <ConditionalRender currentEvent={DragEvent} />}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        name="images"
        hidden
        multiple
      />
    </div>
  );
};

export default Container;
