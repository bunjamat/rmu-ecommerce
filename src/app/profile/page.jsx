"use client";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  console.log("🚀 ~ ProfilePage ~ session:", session)

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>คุณยังไม่เข้าสู่ระบบ</div>;
  }

  return (
    <div>
      <img
        className="w-28 h-28 object-contain"
        src={session.user.image}
        alt="profile"
      />
      <p>เข้าสู่ระบบแล้วโดย : {session.user.name}</p>
    </div>
  );
};

export default ProfilePage;
