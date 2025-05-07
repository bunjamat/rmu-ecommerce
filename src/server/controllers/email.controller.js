import nodemailer from "nodemailer";

export const emailController = {
  sendmail: async (body) => {
    try {
      const { to, subject, text, html } = body;

      if (!to || !subject || (!text && !html)) {
        return {
          error: true,
          message: "กรุณากรอกข้อมูลให้ครบถ้วน",
        };
      }

      // สร้าง transporter สำหรับส่งอีเมล
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      

      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
        html,
      };

      // ส่งอีเมล
      const info = await transporter.sendMail(mailOptions);

      return {
        message: "ส่งอีเมลเรียบร้อยแล้ว",
        info,
      };


    } catch (error) {
      console.error("Error sending email:", error);
      return {
        error: true,
        message: "เกิดข้อผิดพลาดในการส่งอีเมล",
      };
    }
  },
};
