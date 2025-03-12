"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const { data: session, status:loginStatus } = useSession();
  console.log("🚀 ~ LoginForm ~ session:", session)
  console.log("🚀 ~ LoginForm ~ status:", status)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      console.log("🚀 ~ result:", result);

      if (result.error) {
        alert(result.error);
        return false;
      }

      alert("เข้าสู่ระบบสำเร็จ");
      // router.push("/profile");
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  const handleLoginWithLine = () => {
    signIn("line");
  };
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  useEffect(() => {

    if(loginStatus === 'authenticated'){
       router.push('/profile')
    }
    
  }, [loginStatus])


  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
          <CardDescription>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                เข้าสู่ระบบ
              </Button>

              <Button
                onClick={handleLoginWithLine}
                variant="outline"
                className="w-full"
              >
                เข้าสู่ระบบด้วย Line
              </Button>
              <Button
                onClick={handleLoginWithGoogle}
                variant="outline"
                className="w-full"
              >
                เข้าสู่ระบบด้วย Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
