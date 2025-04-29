import { Elysia, error, t } from "elysia";
import { authenController } from "../controllers/authen.controller";

export const authenRoute = new Elysia({ prefix: "/authen" })
  .post(
    "register",
    ({ body, set }) => {
      const register = authenController.register(body);

      if (!register) {
        return {
          message: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
        };
      }

      if (register.error) {
        set.status = 400;
        return {
          message: register.message,
          error: ture,
        };
      }

      return register;
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        fullName: t.String(),
      }),
    }
  )
  .post(
    "login",
    async ({ body, set }) => {
      const checkLogin = await authenController.login(body);

      if (checkLogin.error) {
        set.status = 400;
        return {
          error: true,
          message: checkLogin.message,
        };
      }

      return checkLogin;
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post("/send-otp", ({ body, set }) => {
    try {
      return authenController.sendOtp(body)
      
    } catch (error) {
      set.status = 400;
      return {
        error: true,
        message: error.message,
      };
    }

  })
  .post("/verify-otp", ({ body, set }) => {
    try {
      return authenController.verifyOtp(body)
    } catch (error) {
      set.status = 400;
      return {
        error: true,
        message: error.message,
      };
    }
  })
  .post("/send-email", ({ body, set }) => {
    try {
      return authenController.sendEmail(body)
    } catch (error) {
      set.status = 400;
      return {
        error: true,
        message: error.message,
      };
    }
  })
  ;
