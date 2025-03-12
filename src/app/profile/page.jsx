"use client";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>คุณยังไม่เข้าสู่ระบบ</div>;
  }

  return <div>เข้าสู่ระบบแล้วโดย : {session.user.email}</div>;
};

export default ProfilePage;
