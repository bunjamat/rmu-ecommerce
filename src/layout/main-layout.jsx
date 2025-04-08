"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const MainLayout = ({ children }) => {
  const {data: session} = useSession()

  const path  = usePathname()
  console.log("🚀 ~ MainLayout ~ path:", path)

  if(path.startsWith("/admin")){
    return children
  }
  
  if(session?.user?.role === "admin"){
    return children
  }


  console.log("🚀 ~ MainLayout ~ session:", session)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle>Categories</SheetTitle>
                  {/* <SheetDescription>
Make changes to your profile here. Click save when you're
done.
</SheetDescription> */}
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        Electronics
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        Fashion
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 hover:text-primary">
                        Home & Living
                      </a>
                    </li>
                  </ul>
                  <div className="border-t pt-4">
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="block py-2 hover:text-primary">
                          New Arrivals
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 hover:text-primary">
                          Deals
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            {/* Logo */}
            <Link href={"/"} className="text-xl font-bold">
              Bird Shop
            </Link>
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex ">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>หมวดหมู่สินค้า</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-2">
                      <Link
                        href="/products"
                        className="block"
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`block px-4 py-2 hover:bg-gray-100 rounded`}
                        >
                          ทั้งหมด
                        </NavigationMenuLink>
                      </Link>
                      <Link
                        href="/products?category=clothing"
                        className="block"
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`block px-4 py-2 hover:bg-gray-100 rounded`}
                        >
                          เสื้อผ้า
                        </NavigationMenuLink>
                      </Link>
                      <Link
                        href="/products?category=electronics"
                        className="block"
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`block px-4 py-2 hover:bg-gray-100 rounded`}
                        >
                          อุปกรณ์อิเล็กทรอนิกส์
                        </NavigationMenuLink>
                      </Link>
                      <Link
                        href="/products?category=office"
                        className="block"
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`block px-4 py-2 hover:bg-gray-100 rounded`}
                        >
                          อุปกรณ์สำนักงาน
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/products" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      สินค้าทั้งหมด
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            {/* User Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Link href={"/cart"}>
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          {/* Mobile Search Bar */}
          {isSearchVisible && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">เกี่ยวกับเรา</h3>
              <p>บริการขายสินค้าออนไลน์ ราคาถูก ส่งเร็วทั่วประเทศ</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">บริการลูกค้า</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    ติดต่อเรา
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    คำถามที่พบบ่อย
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">นโยบาย</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    นโยบายการคืนสินค้า
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    เงื่อนไขการใช้งาน
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    นโยบายความเป็นส่วนตัว
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">ติดตามเรา</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; 2025 Bird Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};
export default MainLayout;
