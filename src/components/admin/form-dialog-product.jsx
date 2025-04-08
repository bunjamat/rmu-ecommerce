import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormAddEditProduct from "./form-add-edit-product";
import { useState } from "react";

export function FormDialogProduct({ product }) {
  const [open, setOpen] = useState(false);
  const isEditing = !!product;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
        <Button className={`${isEditing ? "bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}>
        {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FormAddEditProduct
          product={product}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
