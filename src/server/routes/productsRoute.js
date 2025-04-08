import { Elysia, t } from "elysia";
import { productController } from "../controllers/product.controller";
import { handleMultipleFileUpload } from "../utils/upload-file";

export const productsRoute = new Elysia({ prefix: "/products" })
  // ดึงข้อมูลสินค้าทั้งหมด
  .get("/", async () => {
    try {
      const products = await productController.getAllProducts();
      return {
        message: "success",
        products,
      };
    } catch (error) {
      return { message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
  })
  // ดึงข้อมูลสินค้ารายตัว
  .get("/:id", async ({ params }) => {
    const { id } = params;
    try {
      const product = await productController.getProductById(id);
      return {
        message: "success",
        product,
      };
    } catch (error) {
      return { message: error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล" };
    }
  })
  .get("/search", () => {})
  .post("/createProduct", async ({ body, set }) => {
    try {
      // สร้างสินค้า
      const create = await productController.createProduct(body);
      return {
        message: "สร้างสินค้าสำเร็จ",
        product: create,
      };
    } catch (error) {
      set.status = 400;
      return { message: error.message || "เกิดข้อผิดพลาดในการสร้างสินค้า" };
    }
  })
  .post("/uploadImage", async ({ body ,set}) => {
    try {
      const url = await handleMultipleFileUpload(body.images);
      return {
        message: "อัปโหลดรูปภาพสำเร็จ",
        url,
      };
    } catch (error) {
      set.status = 400;
      return { message: error.message || "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ" };
    }
  })
  .post("/updateProduct", () => {})
  .delete("deleteProduct", () => {});
