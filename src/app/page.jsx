"use client";
import SigninButton from "@/components/signin-button";
import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/store/cart";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  // สิ่งที่เขียนในนี้จะถูก render ออกมาบนหน้าเว็บ

  const [count, setCount] = useState(0);
  const [name, setName] = useState("Tongchai");

  // global state
  const { items } = useCartStore();
  
  console.log("🚀 ~ HomePage ~ items:", items)

  useEffect(() => {
    setName(`Tongchai ${count}`);
  }, [count]);

  // ส่วนของการเขียน function หรือ logic อื่นๆ
  const handleClick = () => {
    setCount(count + 1);
  };
  const handleRename = () => {
    setName("Tongchai Bunjamat");
  };

  // ส่วนของการ return ค่าออกมา
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-red-500 hover:text-blue-500 mb-6">
        ยินดีต้อนรับสู่เว็บขายของออนไลน์
      </h1>
      {/* <h2>จำนวนนับ : {count} </h2>
      <Button onClick={() => handleClick()}> เพิ่มจำนวนนับ </Button>
      <Button onClick={() => handleRename()}> update ชื่อ </Button>
      <h2>ชื่อ : {name} </h2>
      <p className="text-xl py-3">This is my first Next.js project</p>
      <p className="text-lg font-bold py-5">สร้างโดย ธงชัย บรรจมาตย์</p> */}
      <SigninButton />
    </div>
  );
};

// ส่วนนี้จำเป็นต้องมี มันเป็นการ export ออกไปเพื่อนำไปใช้งาน
export default HomePage;
