import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
import GoogleProvider from "next-auth/providers/google";

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


          const user = await res.json();

          if(user.error){
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
            email : user.email,
            name : user.full_name,
            role : user.role
          };

        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    // การ login ผ่าน Oauth จะเข้า fn นี้ทั้งหมด
    async signIn({ user, account, profile, email, credentials }) {
      console.log("🚀 ~ signIn ~ email:", email)
      console.log("🚀 ~ signIn ~ profile:", profile)
      console.log("🚀 ~ signIn ~ account:", account)
      console.log("🚀 ~ signIn ~ user:", user)

      user.role = "customer"

      return true
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
        session.user.type = "tester"
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
