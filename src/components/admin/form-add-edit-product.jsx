"use client";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

const createProduct = async (formData) => {
  try {
    const respronse = await axios.post("/api/products/createProduct", formData);
    return respronse.data;
  } catch (error) {
    if (error.respronse) {
      throw new Error(
        error.response.data.message || "เกิดข้อผิดพลาดในการสร้างสินค้า"
      );
    }
    throw error;
  }
};

const updateProduct = async (formData) => {
  try {
    // 'update products set name=$1 , set description=$2 where id=$3'
    const respronse = await axios.post("/api/products/editProduct", formData);
    return respronse.data;
  } catch (error) {
    if (error.respronse) {
      throw new Error(
        error.response.data.message || "เกิดข้อผิดพลาดในการสร้างสินค้า"
      );
    }
    throw error;
  }
};

const FormAddEditProduct = ({ product, closeDialog = null }) => {
  console.log("🚀 ~ FormAddEditProduct ~ product:", product);
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState(product?.image_url || "");

  const defaultValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock_quantity || "",
  };

  const {
    register, // อ้างอิงไปยัง input element
    handleSubmit, // ส่งข้อมูลไปยัง function ที่เรากำหนด
    watch, // ดูค่าของ input element ภายใน form
    reset, // รีเซ็ตค่าใน form
    formState: { errors }, // ตรวจสอบ error ที่เกิดขึ้น
  } = useForm({ defaultValues });

  const values = watch();

  // console.log("🚀 ~ FormAddEditProduct ~ errors:", errors);

  // console.log("🚀 ~ FormAddEditProduct ~ values:", values)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (!imageFile && !isEditing) {
        alert("กรุณาเลือกรูปภาพสินค้า");
        return;
      }
      // console.log("ค่าทั้งหมดที่ได้จาก form :", data);

      const formData = new FormData();

      // map   //วน ที่ต้องการ return ออกมา
      // forEach // วน แต่ไม่ต้องการ return ออกมา
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append("image", imageFile);

      console.log("🚀 ~ FormAddEditProduct ~ formData:", formData);

      // ส่งข้อมูลไปยัง server ผ่าน api
      const result = isEditing
        ? await updateProduct(formData)
        : await createProduct(formData);

      alert("สร้างสินค้าสำเร็จ");
      reset();
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      setError(error.message || "เกิดข้อผิดพลาดในการสร้างสินค้า");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold  text-center">
        {" "}
        {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {error && <p className="text-red-500"> {error} </p>}
        <div className="space-y-3">
          <div className="mb-3">
            <label htmlFor="name">ชื่อสินค้า</label>
            <Input
              id="name"
              {...register("name", { required: "กรุณากรอกชื่อสินค้า" })}
            />
            {errors.name && (
              <p className="text-red-500"> {errors.name.message} </p>
            )}
          </div>
          <div className="description">
            <label htmlFor="name">รายละเอียดสินค้า</label>
            <Input id="description" {...register("description")} />
          </div>
          <div className="price">
            <label htmlFor="name">ราคาสินค้า</label>
            <Input
              type="number"
              id="price"
              {...register("price", { required: "กรุณากรอกราคา" })}
            />
            {errors.price && (
              <p className="text-red-500"> {errors.price.message} </p>
            )}
          </div>
          <div className="stock">
            <label htmlFor="name">จำนวนสินค้าในคลัง</label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { required: "กรุณากรอกจํานวนสินค้า" })}
            />
            {errors.stock && (
              <p className="text-red-500"> {errors.stock.message} </p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="picture">รูปภาพ</label>
            <Input
              id="picture"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-20 h-20 object-cover border rounded-md"
              />
            )}
          </div>
        </div>

        {errors.exampleRequired && <span>This field is required</span>}
        <div className="text-right">
          <Button disabled={loading} className="mt-3 " type="submit">
            {loading
              ? "กําลังสร้างสินค้า..."
              : isEditing
              ? "แก้ไขสินค้า"
              : "เพิ่มสินค้าใหม่"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddEditProduct;
