'use client';

import RoleBasedGuard, { ROLE } from "@/components/auth/role-based-guard";
import React from "react";

const ManageAdmin = () => {
  return (
    <RoleBasedGuard
      allowedRoles={[ROLE.ADMIN, ROLE.SUPER_ADMIN]}
      fallback={
        <div className="text-red-500 text-center text-xl font-bold">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </div>
      }
    >
      <div>หน้าการจัดการข้อมูล Admin </div>
    </RoleBasedGuard>
  );
};

export default ManageAdmin;
