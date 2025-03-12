import { db } from "../db.config";

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
};
