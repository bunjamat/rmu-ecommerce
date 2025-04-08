"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { useEffect, useState } from "react";

import { Trash } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import useCartStore from "@/lib/store/cart";
import { useSession } from "next-auth/react";

// separator textarea select

export default function FormCheckout() {
  const {data:session ,status} = useSession()
  const { removeItem, getTotalPrice, items,clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [responseOrder, setResponseOrder] = useState(null);

  const [displayTotal, setDisplayTotal] = useState(0);

  // เช็คให้ รอ getTotalPrice คำนวนเสร็จก่อน
  useEffect(() => {

    setDisplayTotal(parseFloat(getTotalPrice()).toLocaleString("th-TH"));

  }, [getTotalPrice,items]);

  const handleSubmit = async () => {
    if (name === "" || email === "" || address === "") {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    try {
      const data = {
        userId : session?.user.id,
        name,
        email,
        address,
        items,
        total: parseFloat(displayTotal),
      };
      const res = await axios.post("/api/orders/create", data);

      setResponseOrder(res.data);
      setOpenDialog(true);

      clearCart()
      
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      alert("เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
      return;
    }
  };

  return (
    <>
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold">ตะกร้าของฉัน</h1>
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
                    <Button variant="outline" size="icon">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>1</span>
                    <Button variant="outline" size="icon">
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
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$139.98</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes</span>
                <span>$11.20</span>
              </div> */}
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>฿{displayTotal}.-</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping &amp; Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Anytown USA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment">วิธีชำระเงิน</Label>
                <p>รับชําระเงินด้วย QR code (Promptpay)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">
                สั่งซื้อสินค้า
              </Button>
            </CardFooter>
          </Card>
          {/* dialog ชำระเงิน */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ชำระเงิน</DialogTitle>
                <DialogDescription>รายละเอียดการชำระเงิน</DialogDescription>
              </DialogHeader>
              <div className="flex justify-center items-center flex-col">
                {responseOrder?.success ? (
                  <img
                    className="max-w-xs"
                    src={responseOrder?.qrcodeUrl}
                    alt="qrcode"
                  />
                ) : null}
                <p>
                  จำนวนที่ต้องจ่าย : {getTotalPrice().toLocaleString("th-TH")}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
