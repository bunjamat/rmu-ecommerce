"use client";
import alumniData from "@/lib/data/alumni";
import React from "react";

import dynamic from "next/dynamic";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ArrowDownToLine, FileText } from "lucide-react";
import ButtonExportPDF from "./button-export-pdf";

const AlumniPDFViewer = dynamic(
  () => import("./alumni-pfd-document").then((mod) => mod.AlumniPDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const SectionAlumni = () => {
  const data = alumniData;
  //  {
  //     id: 1,
  //     studentId: "60123456",
  //     name: "นายสมชาย ใจดี",
  //     faculty: "วิศวกรรมศาสตร์",
  //     major: "วิศวกรรมคอมพิวเตอร์",
  //     graduationYear: 2564,
  //     currentJob: "โปรแกรมเมอร์",
  //     company: "บริษัท เทคโนโลยี จำกัด",
  //     email: "somchai@email.com",
  //     phone: "081-234-5678"
  //   },
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">รายงานข้อมูลศิษย์เก่า</h1>
      <div className="flex gap-2 justify-end mb-2">
        <ButtonExportPDF data={data} />
        <Button className="bg-green-500 hover:bg-green-600">
          <ArrowDownToLine />
          Export Excel
        </Button>
      </div>
      <div className="h-screen w-full">
        <AlumniPDFViewer data={data} />
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">รหัสนักศึกษา</TableHead>
            <TableHead>สาขา</TableHead>
            <TableHead>ปีที่จบ</TableHead>
            <TableHead>งานปัจจุบัน</TableHead>
            <TableHead>บริษัท</TableHead>
            <TableHead>อีเมล</TableHead>
            <TableHead>เบอร์โทร</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.studentId}>
              <TableCell className="font-medium">{item.studentId}</TableCell>
              <TableCell>{item.major}</TableCell>
              <TableCell>{item.graduationYear}</TableCell>
              <TableCell>{item.currentJob}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default SectionAlumni;
