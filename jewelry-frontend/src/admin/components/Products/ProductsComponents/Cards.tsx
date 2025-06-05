import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface CardProps {
  index?: number;
  title: string;
  description: string;
  img: string;
  footer?: string;
  alt?: string;
  onEdit?: () => void;
  price: number;
  stock: number;
}

export default function Cards({ ...props }: CardProps) {
  return (
    <Card className="flex flex-col pt-0">
      <img src={props.img} alt={props.alt} className="rounded-t-lg w-[300px]" />
      <CardHeader className="w-full flex-1">
        <CardTitle className="text-lg">{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-md font-semibold">Price: ${props.price} USD</p>
        <p className="text-md font-semibold">Stock: {props.stock} pieces</p>
      </CardContent>
      <CardFooter className="">
        <div className="flex flex-col sm:flex-row w-full">
          <Button
            className="w-full sm:w-[calc(50%-4px)] bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer text-black mb-2 sm:mb-0"
            onClick={props.onEdit}
          >
            Modify <Pencil />
          </Button>
          <Button
            className="w-full sm:w-[calc(50%-4px)] sm:ml-2 bg-red-500 hover:cursor-pointer text-black"
            variant="destructive"
          >
            Delete <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
