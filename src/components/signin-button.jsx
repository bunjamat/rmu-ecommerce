"use client";
import React from "react";
import { Button } from "./ui/button";

const SigninButton = () => {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => {
          return alert("เข้าสู่ระบบ");
        }}
      >
        เข้าสู่ระบบ
      </Button>
      <Button
        onClick={() => {
          return alert("ออกจากระบบ");
        }}
        variant="destructive"
      >
        ออกจากระบบ
      </Button>
    </div>
  );
};

export default SigninButton;
