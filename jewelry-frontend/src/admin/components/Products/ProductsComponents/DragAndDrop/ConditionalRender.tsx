import type { DragAndDropEvent } from "@/types/dragAndDrop";

type Props = {
  currentEvent: DragAndDropEvent;
};

const ConditionalRender = ({ currentEvent }: Props) => {
  switch (currentEvent) {
    case "dragleave":
      return (
        <p className="px-4">
          Drag and drop your images here or click and select it
        </p>
      );
    case "dragover":
      return <p className="px-4">Dragging up the zone</p>;
    default:
      return (
        <p className="px-4">
          Drag and drop your images here or click and select it
        </p>
      );
  }
};

export default ConditionalRender;
