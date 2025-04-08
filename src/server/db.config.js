import pgPromise from "pg-promise";

// กำหนดค่าพื้นฐานสำหรับเชื่อมต่อ
const pgp = pgPromise({
  capSQL: true, // แปลง SQL ให้เป็นตัวพิมพ์ใหญ่
});

const globalForPg = globalThis;


// กําหนดค่าพื้นฐานสำหรับเชื่อมต่อ
const connectionConfig = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
};

// สร้าง instance สำหรับเชื่อมต่อ
const db = pgp(connectionConfig);

db.connect()
  .then((obj) => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database Connection Failed", error);
  });

export { db, pgp };
