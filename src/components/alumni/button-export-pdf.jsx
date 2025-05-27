import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
import { DateExport } from "@/lib/date-format";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AlumniPDFDocument from "./alumni-pfd-document";

const ButtonExportPDF = ({ data }) => {

  const fileName = `รายงานข้อมูลศิษย์เก่า_${DateExport(new Date().getTime())}.pdf`;

  console.log("🚀 ~ ButtonExportPDF ~ fileName:", fileName);

  const handleExport = () => {
     console.log("🚀 ~ ButtonExportPDF ~ fileName:", fileName);
    toast.success("ส่งออกไฟล์เรียบร้อยแล้ว");
  };
  const handleExportError = (error) => {
    console.log("🚀 ~ handleExportError ~ error:", error);
    toast.error("ไม่สามารถส่งออกไฟล์ได้");
  };

  return (
    <Button onClick={handleExport} className="bg-red-500 hover:bg-red-600">
      <FileText />
      ส่งออก PDF
    </Button>
  );
  return (
    <PDFDownloadLink
      document={<AlumniPDFDocument data={data} />}
      fileName={fileName}
      onClick={handleExport}
      onError={handleExportError}
    >
      {({ loading, error }) => (
        <Button className="bg-red-500 hover:bg-red-600">
          <FileText />
          {loading ? "กําลังส่งออก..." : "ส่งออก PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ButtonExportPDF;
