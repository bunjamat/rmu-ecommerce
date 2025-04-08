import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Credentials Email/Password
    CredentialsProvider({
      name: "login username/password",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        try {
          // ค้นหา user จาก api login
          const res = await fetch("http://localhost:3080/api/authen/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          if (user.error) {
            throw new Error(user.message);
          }

          //   const user = {
          //     id: 1,
          //     email: "m@example.com",
          //     password: "123456",
          //     fullName: "John Doe",
          //     role: "customer",
          //   };

          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    // OTP
    CredentialsProvider({
      id: "otp-login",
      name: "Login SMS OTP",
      credentials: {
        phone_number: { label: "เบอร์โทร", type: "tel" },
        otp_code: { label: "รหัส otp", type: "text" },
        token_ref: { label: "รหัสอ้างอิง", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials.phone_number ||
          !credentials.otp_code ||
          !credentials.token_ref
        ) {
          return null;
        }

        try {
          // ส่งไป OTP ไปยัง api
          const res = await fetch(
            "http://localhost:3080/api/authen/verify-otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phoneNumber: credentials.phone_number,
                otpPin: credentials.otp_code,
                tokenRef: credentials.token_ref,
              }),
            }
          );

          const user = await res.json();
          console.log("🚀 ~ authorize ~ user:", user)

          if (user.error) {
            throw new Error(user.message);
          }

          //   const user = {
          //     id: 1,
          //     email: "m@example.com",
          //     password: "123456",
          //     fullName: "John Doe",
          //     role: "customer",
          //   };

          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    // LINE
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
    // Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // การ login ผ่าน Oauth จะเข้า fn นี้ทั้งหมด
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("🚀 ~ signIn ~ email:", email)
      // console.log("🚀 ~ signIn ~ profile:", profile)
      // console.log("🚀 ~ signIn ~ account:", account)
      // console.log("🚀 ~ signIn ~ user:", user)

      // user.role = "customer"

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.type = "tester";
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 วัน
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
