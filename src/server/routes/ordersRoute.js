import { Elysia, t } from "elysia";
import { ordersController } from "../controllers/orders.controller";
import { auth } from "../middleware/auth.middleware";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";

export const ordersRoute = new Elysia({ prefix: "/orders" })
  // ดึงข้อมูลสินค้าทั้งหมด
  // .use(auth())
  .use(
      jwt({
        name: "jwt",
        secret: "fsafasdfsadfasdfasdfsadfasdfasdf",
        exp: "1d",
      })
    )
    .use(bearer())
  .post("/create", async ({ body, set }) => {
    try {
      const order = await ordersController.CreateOrderAndQrCode(body);

      return order
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error.message,
      };
    }
  })
  .post("/update", async({body}) => {
    return {
      success: true,
       message: "update สินค้า ต้องผ่าน middleware"
    }
  },{
    beforeHandle : auth
  })
