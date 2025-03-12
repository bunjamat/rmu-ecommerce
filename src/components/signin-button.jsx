"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session, status: loginStatus } = useSession();
  console.log("🚀 ~ SigninButton ~ session:", session)



  const router = useRouter();
  return (
    <div className="flex gap-2 justify-center">
      <Button variant="secondary">
        <a href=""></a>
        <Link href={"/register"}>สมัครสมาชิก </Link>
      </Button>
      {session ? (
        <Button
          onClick={() => {
            signOut();
          }}
          variant="destructive"
        >
          ออกจากระบบ
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          เข้าสู่ระบบ
        </Button>
      )}
    </div>
  );
};

export default SigninButton;
