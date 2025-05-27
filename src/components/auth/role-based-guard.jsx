import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ROLE = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  FACULTY_ADMIN: "faculty_admin",
  ALUMNI: "alumni",
  GUEST: "guest",
  INSTRUCTOR: "instructor",
};

const RoleBasedGuard = ({
  allowedRoles, // role ที่สามารถเข้าถึงหน้านี้ได้
  children, // เนื้อหาในแต่ละหน้า
  fallback, // เนื้อหาที่แสดงถ้าไม่สามารถเข้าถึงหน้านี้ได้
  returnTo, // หน้าที่จะไปหลังจากเข้าถึงหน้านี้
}) => {
  // logic
  const { data: session, status } = useSession();
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  // แปลง allowedRoles เป็น array เสมอ
  const roleArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  useEffect(() => {
    // เช็คว่า session โหลดอยู่มั๊ย
    if (status === "loading") return;

    // ถ้าไม่มี session ให้ไปหน้า login
    if (!session || status === "unauthenticated") {
      router.push("/login");
      // ถ้า session หมดอายุ
      setAuthorized(false);
      return;
    }

    // ถ้ามี session แล้ว
    const userRole = session?.user?.role;

    // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงหน้านี้หรือไม่
    const hasPermission = roleArray.includes(userRole); // true false

    // ถ้าผู้ใช้ไม่มีสิทธิ์เข้าถึงหน้านี้ และมีการกําหนด returnTo ให้ไปหน้า returnTo
    if (!hasPermission && returnTo) {
      // ถ้าเข้าหน้านี้ไม่ได้ให้กลับไปที่หน้า returnTo
      router.push(returnTo);
    }
    // ถ้าผู้ใช้มีสิทธิ์เข้าถึงหน้านี้
    setAuthorized(hasPermission); //true
  }, [status, session]);

  // ถ้ากำลังตรวจสอบสิทธิ์ หรือ loading session
  if (status === "loading") return <div>กำลังตรวจสอบสิทธิ์</div>;

  // ถ้าผู้ใช้ไม่มีสิทธิ์เข้าถึงหน้านี้
  if (!authorized && fallback) {
    return fallback || <div>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</div>;
  }

  // ถ้าผู้ใช้มีสิทธิ์เข้าถึงหน้านี้
  return authorized ? children : <div>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</div>;
};

export default RoleBasedGuard;
