"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/lib/store/cart";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";

export default function CartPage() {
  const { items, addItem, updateQuantity } = useCartStore();
  console.log("🚀 ~ CartPage ~ items:", items);
  const handleAdd = async (item) => {
    await addItem(item, item.stock_quantity);
  };
  const handleRemove = async (item) => {
    await updateQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="grid max-w-3xl gap-4 px-4 mx-auto">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <Button size="icon" variant="outline" className="rounded-full">
          <RefreshCwIcon className="w-4 h-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      <div className="grid gap-4">
        <div className="mt-4 space-y-4">
          {items?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950"
              >
                <img
                  src={item.image}
                  width={80}
                  height={80}
                  alt="Product Image"
                  className="rounded-md"
                  style={{ aspectRatio: "80/80", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Black, Large
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleRemove(item)}
                    variant="outline"
                    size="icon"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => handleAdd(item)}
                    variant="outline"
                    size="icon"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-right font-medium">
                  ฿{parseFloat(item.price).toLocaleString("th-TH")}.-
                </div>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
        <Card className="p-4">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div>Subtotal</div>
              <div>$99.00</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Shipping</div>
              <div>$10.00</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Tax</div>
              <div>$10.90</div>
            </div>
            <Separator className="w-full" />
            <div className="flex items-center justify-between font-medium">
              <div>Total</div>
              <div>$119.90</div>
            </div>
          </div>
        </Card>
        <div className="flex flex-col gap-2">
          <div />
          <Button>Apply coupon</Button>
        </div>
        <Button  size="lg" className="w-full">
          <Link href={"/checkout"}>Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
