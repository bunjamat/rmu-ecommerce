import AppSidebar from "@/components/admin/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const adminMenu = [
  { title: "Dashboard", url: "/admin" },
  { title: "จัดการสินค้า", url: "/admin/products" },
  { title: "จัดการลูกค้า", url: "/admin/users" },
  { title: "จัดการคำสั่งซื้อ", url: "/admin/orders" },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="container my-4 mx-auto flex flex-row gap-3">
        
      <div>
        <ul className="flex flex-col gap-3 bg-slate-100 p-4">
          {adminMenu.map((menu) => {
            return (
              <li className="hover:text-blue-500" key={menu.title}>
                <a href={menu.url}>{menu.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1" >{children}</div>
    </div>
  );
};

export default AdminLayout;
