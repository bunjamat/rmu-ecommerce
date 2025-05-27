import { Elysia, t } from "elysia";

export const auth = async ({ jwt, bearer, set }) => {
  // กรณีไม่มี bearer token
  if (!bearer) {
    set.status = 401;
    return {
      error: true,
      message: "No token provided",
    };
  }
  try {
    const profile = await jwt.verify(bearer);
    // กรณี verify ไม่ผ่าน
    if (!profile || !profile.id) {
      set.status = 401;
      return {
        error: true,
        message: "Invalid token",
      };
    }
    return { profile };
  } catch (error) {
    console.log("🚀 ~ .derive ~ error:", error);

    throw new Error("Token verification failed");
  }
};
