"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const router = useRouter();
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        เข้าสู่ระบบ
      </Button>
      <Button
        
        variant="secondary"
      >
        <a href=""></a>
        <Link href={"/register"}>สมัครสมาชิก </Link>
        
      </Button>
      <Button
        onClick={() => {
         signOut()
        }}
        variant="destructive"
      >
        ออกจากระบบ
      </Button>
    </div>
  );
};

export default SigninButton;
