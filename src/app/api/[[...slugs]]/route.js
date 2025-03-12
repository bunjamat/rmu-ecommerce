// app/api/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import { products } from "@/lib/mock-data";
import { productsRoute } from "@/server/routes/productsRoute";
import { authenRoute } from "@/server/routes/authenRoute";

const swaggerConfig = {
  documentation: {
    info: {
      title: "Nextjs Elysia Documentation API",
      description: "คู่มือ API ระบบ Ecommerce",
      version: "1.0.0",
    },
  },
};

const app = new Elysia({ prefix: "/api" })
  .use(swagger(swaggerConfig))
  .use(productsRoute)
  .use(authenRoute)
  

export const GET = app.handle;
export const POST = app.handle;
export const DELETE = app.handle;
