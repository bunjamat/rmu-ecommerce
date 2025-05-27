"use client";
import { DateLongTH, DateShortTH } from "@/lib/date-format";
import {
  PDFViewer,
  Font,
  StyleSheet,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";

// เพิ่ม Font ไทย สําหรับ PDF
Font.register({
  family: "THSarabunNew",
  fonts: [
    {
      src: "/fonts/THSarabunNew.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/THSarabunNew-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// เพิ่ม styles สำหรับ เอกสาร
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
    fontFamily: "THSarabunNew",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text1Bold: { fontSize: 18, fontWeight: 800, textAlign: "center" },

  subHeader: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#000000",
    color: "white",
  },
  tableColHeader: {
    width: "14.5%",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  tableCol: {
    width: "14.5%",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

const currentDate = DateShortTH(new Date());

export const AlumniPDFViewer = ({ data }) => {
  return (
    <PDFViewer width="100%" height="100%">
      <AlumniPDFDocument data={data} />
    </PDFViewer>
  );
};

const AlumniPDFDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>รายงานข้อมูลศิษย์เก่า</Text>
        <Text style={styles.subHeader}>วันที่ออกรายงาน: {currentDate}</Text>

        <View style={styles.table}>
          {/* หัวตาราง */}
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableColHeader}>รหัสนักศึกษา</Text>
            <Text style={styles.tableColHeader}>ชื่อ-นามสกุล</Text>
            <Text style={styles.tableColHeader}>สาขา</Text>
            <Text style={styles.tableColHeader}>ปีที่จบ</Text>
            <Text style={styles.tableColHeader}>อาชีพปัจจุบัน</Text>
            <Text style={styles.tableColHeader}>บริษัท/องค์กร</Text>
            <Text style={styles.tableColHeader}>การติดต่อ</Text>
          </View>

          {/* เนื้อหาตาราง */}
          {data?.map((alumni, index) => (
            <View style={styles.tableRow} key={alumni.id || index}>
              <Text style={styles.tableCol}>{alumni.studentId}</Text>
              <Text style={styles.tableCol}>{alumni.name}</Text>
           
              <Text style={styles.tableCol}>{alumni.major}</Text>
              <Text style={styles.tableCol}>{alumni.graduationYear}</Text>
              <Text style={styles.tableCol}>{alumni.currentJob}</Text>
              <Text style={styles.tableCol}>{alumni.company}</Text>
              <Text style={styles.tableCol}>
                {alumni.email}
                {"\n"}
                {alumni.phone}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default AlumniPDFDocument;
