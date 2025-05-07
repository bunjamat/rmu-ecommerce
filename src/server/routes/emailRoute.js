import { Elysia, error, t } from "elysia";
import { emailController } from "../controllers/email.controller";

export const emailRoute = new Elysia({ prefix: "/email" })
  .post(
    "send-email",
    ({ body, set }) => {
      const sendmail = emailController.sendmail(body);

      if (!sendmail) {
        return {
          message: "เกิดข้อผิดพลาดในการส่งอีเมล",
        };
      }

      if (sendmail.error) {
        set.status = 400;
        return {
          message: sendmail.message,
          error: ture,
        };
      }

      return sendmail;
    },
    {
      body: t.Object({
        to: t.String(), // อีเมลผู้รับ
        subject: t.String(), // หัวข้ออีเมล
        text: t.String(), // เนื้อหาอีเมลแบบ text
        html : t.Optional(t.String()), // เนื้อหาอีเมล html
        attachments: t.Optional(t.Array(t.String())), // ชื่อไฟล์แนบ
      }),
    }
  );