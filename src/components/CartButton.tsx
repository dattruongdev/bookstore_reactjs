import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function CartButton() {
  const [added, setAdded] = useState(false);
  return (
    <Button
      onClick={() => setAdded(!added)}
      className={cn(
        "mr-2 bg-pink-400 px-5 rounded-full text-white",
        added && "bg-purple-500"
      )}
    >
      {added ? "Remove cart" : "Add cart"}
      <ShoppingCart color="white" />
    </Button>
  );
}
