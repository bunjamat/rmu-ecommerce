"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import shadcn/ui components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("credentials");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการล็อกอิน");
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      setError("กรุณากรอกเบอร์โทรศัพท์");
      return;
    }

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message);
        return;
      }

      setOtpSent(true);
      setError("");
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการส่ง OTP");
    }
  };

  const handleOTPLogin = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || !otpCode) {
      setError("กรุณากรอกเบอร์โทรศัพท์และรหัส OTP");
      return;
    }

    try {
      const result = await signIn("otp-login", {
        phone_number: phoneNumber,
        otp_code: otpCode,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการล็อกอิน");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>เข้าสู่ระบบ</CardTitle>
        </CardHeader>

        {error && (
          <CardContent className="pt-0">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        )}

        <CardContent className="space-y-4">
          <Tabs 
            defaultValue="credentials" 
            value={loginMethod} 
            onValueChange={setLoginMethod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="credentials">อีเมล/รหัสผ่าน</TabsTrigger>
              <TabsTrigger value="otp">SMS OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={credentials.email}
                    onChange={handleCredentialsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={credentials.password}
                    onChange={handleCredentialsChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  เข้าสู่ระบบ
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={otpSent}
                    />
                    {!otpSent && (
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        variant="secondary"
                      >
                        ส่ง OTP
                      </Button>
                    )}
                  </div>
                </div>
                
                {otpSent && (
                  <form onSubmit={handleOTPLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">รหัส OTP</Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otpCode}
                          onChange={setOtpCode}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} />
                              ))}
                            </InputOTPGroup>
                          )}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      ยืนยัน OTP
                    </Button>
                  </form>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                หรือเข้าสู่ระบบด้วย
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              variant="outline"
              className="flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              เข้าสู่ระบบด้วย Google
            </Button>
            <Button
              type="button"
              onClick={() => signIn("line", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M19.411 24H4.58C2.053 24 0 21.947 0 19.418V4.582C0 2.053 2.053 0 4.58 0h14.83C21.947 0 24 2.053 24 4.582v14.836C24 21.947 21.947 24 19.411 24zM18.371 12.497c0-3.096-3.102-5.612-6.903-5.612-3.8 0-6.904 2.516-6.904 5.612 0 2.778 2.461 5.108 5.792 5.547.226.049.534.15.613.345.07.178.045.458.022.638l-.1.597c-.03.182-.141.709.619.387.759-.322 4.085-2.408 5.574-4.125h-.001c1.026-1.13 1.288-2.276 1.288-3.39l.001.001z" />
                <path d="M17.375 15.17v-.001c.965-.843 1.471-1.902 1.457-3.177C18.815 9.205 15.975 7 12.5 7 9.026 7 6.187 9.205 6.168 11.993c-.017 2.788 2.787 5.046 6.229 5.046.257 0 .512-.012.764-.034v.001c1.604-.132 3.11-.6 4.373-1.345l-.159-.491z" fill="#fff" />
              </svg>
              เข้าสู่ระบบด้วย Line
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}