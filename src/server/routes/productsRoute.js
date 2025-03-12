import { Elysia, t } from "elysia";
import { productController } from "../controllers/product.controller";

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
  .get("search", () => {})
  .post("createProduct", () => {})
  .delete("deleteProduct", () => {});
