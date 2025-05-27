import Container from "./Container";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<File[]>>; // Agregamos setImages como prop her
}

const DragAndDrop = ({ ...props }: Props) => {
  const { setImages } = props;
  return (
    <>
      <p className="">Images</p>
      <div className="flex flex-col m-auto items-center">
        <Container setImages={setImages} />
      </div>
    </>
  );
};

export default DragAndDrop;
