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
import axios from "axios";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const { data: session, status: loginStatus } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otpData, setOtpData] = useState({
    phone_number: "",
    otp_code: "",
    token_ref: "",
  });
  console.log("🚀 ~ LoginForm ~ otpData:", otpData)

  const [loginType, setLoginType] = useState("email");
  const [isSendOtp, setIsSendOtp] = useState(false);

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

  const handleLoginWithOtp = async (e) => {
    e.preventDefault();
    try {
      // ส่ง OTP ไปยังเบอร์โทร
      const sendOtp = await axios.post("/api/authen/send-otp", {
        phoneNumber: otpData.phone_number,
      });

      if (sendOtp.data.error) {
        alert(sendOtp.data.message);
        return false;
      }
      setIsSendOtp(true);
      setOtpData({ ...otpData, token_ref: sendOtp.data.token });
      alert("ส่ง OTP ไปยังเบอร์โทรแล้ว");
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otpData.otp_code) {
      alert("กรุณากรอกรหัส OTP");
      return false;
    }
    if(otpData.otp_code.length < 6) {
      alert("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return false;
    }

    const result = await signIn("otp-login", {
      ...otpData,
      redirect: false,
    });

    console.log("🚀 ~ result:", result);

    if (result.error) {
      alert(result.error);
      return false;
    }

    alert("เข้าสู่ระบบสำเร็จ");
    // router.push("/profile");
  };

  useEffect(() => {
    if (loginStatus === "authenticated") {
      router.push("/profile");
    }
  }, [loginStatus]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
          <CardDescription>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2 mb-4">
            <Button
              onClick={() => setLoginType("email")}
              className="flex-1"
              variant={loginType === "email" ? "default" : "outline"}
            >
              เข้าสู่ระบบ email password
            </Button>
            <Button
              onClick={() => setLoginType("otp")}
              className="flex-1"
              variant={loginType === "otp" ? "default" : "outline"}
            >
              เข้าสู่ระบบ SMS OTP
            </Button>
          </div>

          {loginType === "email" ? (
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
          ) : (
            <form onSubmit={handleLoginWithOtp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">เบอร์โทร</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={otpData.phone_number}
                    onChange={(e) =>
                      setOtpData({ ...otpData, phone_number: e.target.value })
                    }
                    type="tel"
                    placeholder="080 xxxxxxx"
                    required
                  />
                </div>
                {isSendOtp && (
                  <div className="grid gap-2">
                    <Label htmlFor="email">กรอกรหัส OTP</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={otpData.otp_code}
                      onChange={(e) =>
                        setOtpData({ ...otpData, otp_code: e.target.value })
                      }
                      type="text"
                      placeholder="xxxxxx"
                      maxLength={6}
                    />
                    <Button type="button" onClick={handleVerifyOtp} className="w-full">
                      ยังยืนรหัส OTP
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  ส่งรหัส OTP
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
