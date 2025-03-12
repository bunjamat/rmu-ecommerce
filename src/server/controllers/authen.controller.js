import { db } from "../db.config";
import bcrypt from "bcryptjs";

export const authenController = {
  register: async (body) => {
    try {
      const { email, password, fullName } = body;

      // เช็คข้อมูลว่า ลงทะเบียนแล้วหรือยัง
      const exitedUser = await db.oneOrNone(
        "SELECT id FROM public.users WHERE email = $1;",
        [email]
      );

      if (exitedUser) {
        throw new Error("มีผู้ใช้งานอยู่แล้ว");
      }

      // เข้ารหัส password
      const passwordHash = bcrypt.hashSync(password, 10);

      // สร้าง user ใหม่
      const result = await db.one(
        "INSERT INTO public.users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING *;",
        [email, passwordHash, fullName]
      );

      return result;
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
  login: async (body) => {
    try {
      const { email, password } = body;

      // เช็ค user ว่ามีมั๊ย
      const user = await db.oneOrNone(
        "SELECT * FROM public.users WHERE email = $1;",
        [email]
      );

      if (!user) {
        throw new Error("ไม่พบผู้ใช้งาน");
      }

      // ถ้ามี user ให้เช็ค password ว่าตรงกันมั๊ย
      const validatePassword = bcrypt.compareSync(password, user.password_hash);

      if (!validatePassword) {
        throw new Error("รหัสผ่านไม่ถูกต้อง");
      }

      return user;
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};
