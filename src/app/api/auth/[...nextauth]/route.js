import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
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

          if (!res.ok) {
            throw new Error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
          }

          if (res.error) {
            throw new Error(res.message);
          }
          //   const user = {
          //     id: 1,
          //     email: "m@example.com",
          //     password: "123456",
          //     fullName: "John Doe",
          //     role: "customer",
          //   };
          const user = await res.json();
          return user;
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
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
