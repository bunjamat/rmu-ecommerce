"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { fetcher } from "@/lib/fechData";
import { Package, Pencil, Trash2 } from "lucide-react";
import { FormDialogProduct } from "@/components/admin/form-dialog-product";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const ManageProductPage = () => {
  const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

  console.log("🚀 ~ ManageProductPage ~ data:", data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className=" w-full">
      <div className="flex gap-2">
        <Button
          onClick={() => {
            window.location.href = "/admin/products/add";
          }}
        >
          + เพิ่มสินค้า{" "}
        </Button>
        {/* dialog เพิ่ม แก้ไขสินค้า */}
        <FormDialogProduct />
      </div>

      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>รูปภาพ</TableHead>
            <TableHead>ชื่อสินค้า</TableHead>
            <TableHead className="text-right">ราคา</TableHead>
            <TableHead className="text-right">สต็อก</TableHead>
            <TableHead className="text-right">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-20 w-20 object-cover rounded"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                )}
           
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
           
              <TableCell>{product.price}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {product.stock_quantity}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2">
                <FormDialogProduct product={product} />
                  <Button variant="destructive">
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ManageProductPage;
