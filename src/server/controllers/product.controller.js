import { db } from "../db.config";
import { handleUploadFile } from "../utils/upload-file";

export const productController = {
  getAllProducts: async () => {
    // ถ้าต้องการข้อมูล 1 row ให้ใช้ db.oneOrNone {}
    // ถ้าต้องการข้อมูลราย row ให้ใช้ db.manyOrNone []
    // ถ้าต้องการ resutl ในการ insert หรือ update ให้ใช้ db.result
    // ถ้าต้องการ อะไรก็ได้ ให้ใช้ db.any
    const result = await db.manyOrNone(
      "SELECT * FROM public.products ORDER BY id DESC;"
    );
    return result;
  },
  getProductById: async (id, name) => {
    const result = await db.oneOrNone(
      "SELECT * FROM public.products WHERE id = $1;",
      [id]
    );
    return result;
  },
  createProduct: async (body) => {
    const { name, description, price, stock, image } = body;
    let image_url = "";
    const isImage = typeof image;
    console.log("🚀 ~ createProduct: ~ isImage:", isImage)

    try {
      if (image) {
        image_url = await handleUploadFile(image);
      }
    } catch (error) {
      throw new Error(error.message || "เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ");
    }

    const isExist = await db.manyOrNone(
      `
      SELECT * FROM public.products WHERE name = $1;`,
      [name]
    );

    if (isExist.length > 0) {
      throw new Error("สินค้านี้มีอยู่แล้ว");
    }

    const result = await db.one(
      `
      INSERT INTO public.products (name, description, price, stock_quantity,image_url) VALUES ($1, $2, $3, $4 , $5) RETURNING *;`,
      [name, description, price, stock, image_url]
    );

    return result;
  },
};
