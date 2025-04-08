import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { join, extname } from "path";
import { nanoid } from "nanoid";

const UPLAOD_PATH = "public/uploads";

// สร้าง floder สำหรับเก็บไฟล์ที่อัพโหลด
try {
  await mkdir(UPLAOD_PATH, { recursive: true });
} catch (error) {
  console.log(error);
}

// สร้างประเภทของไฟล์ที่อนุญาตให้อัพโหลด
const ALLOWED_FILE_TYPE = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  //   "application/pdf",
  //   "application/msword",
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  //   "application/vnd.ms-excel",
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  //   "text/plain", // .txt
  //   "text/csv", // .csv
];

const handleUploadFile = async (file) => {
  if (!file) {
    throw new Error("ไม่พบไฟล์ที่ต้องการอัพโหลด");
  }

  // เช็คประเภทของไฟล์ที่อัพโหลด
  if (!ALLOWED_FILE_TYPE.includes(file.type)) {
    throw new Error("ประเภทของไฟล์ไม่ถูกต้อง");
  }

  // สร้างชื่อไฟล์ใหม่
  const fileName = `${nanoid()}${extname(file.name)}`;
  const filePath = join(UPLAOD_PATH, fileName);

  // อัพโหลดไฟล์
  try {
    const arryBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arryBuffer);

    await writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "เกิดข้อผิดพลาดในการอัพโหลดไฟล์");
  }
};

const handleMultipleFileUpload = async (files) => {
  if (!files || !Array.isArray(files) || files.length === 0) {
    throw new Error("ไม่พบไฟล์ที่ต้องการอัปโหลด");
  }

  if (files.length > 2) {
    throw new Error("อัพโหลดได้ไม่เกิน 2 ไฟล์");
  }

  const uploadPromises = files.map((file) => handleUploadFile(file));

  const results = await Promise.allSettled(uploadPromises);

  // กรองเฉพาะผลลัพธ์ที่สำเร็จ
  const successfulUploads = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  // ตรวจสอบว่ามีการอัปโหลดสำเร็จอย่างน้อย 1 ไฟล์
  if (successfulUploads.length === 0) {
    throw new Error("ไม่สามารถอัปโหลดไฟล์ได้ เกิดข้อผิดพลาดกับทุกไฟล์");
  }

  // คืนค่าอาร์เรย์ของ URL ของไฟล์ที่อัปโหลดสำเร็จ
  return successfulUploads;
};

export { handleUploadFile, handleMultipleFileUpload };
