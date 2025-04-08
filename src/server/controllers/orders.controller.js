import { db } from "../db.config";
import { generatePromptPayQR } from "../utils/promptpay-genarate";
import { handleUploadFile } from "../utils/upload-file";
import { v4 as uuidv4 } from "uuid";

export const ordersController = {
  CreateOrderAndQrCode: async (body) => {
    // ถ้า insert หลาย table
    //ต้องมี transetion 

    // begin
    // 1. คำนวนราคาและตรวจสอบสินค้า ตัดสต็อกสินค้า
    // 2. สร้างเลข ref การชำระเงิน
    // 3. บันทึก ออเดอร์
    // 4. บันทึก รายการสินค้าที่สั่งซื่้อ
    // 5. สร้าง qr code ชำระเงิน
    // 6. บันทึกข้อมูลการชำระเงิน
    // 7. ส่งข้อมูลกลับ
    // commit

    // ถ้าไม่สำเร็จ อย่างใดอย่างหนึ่ง ให้
    // rollback
    try {
      //qr
      const { userId, name, email, phone, address, items, total } = body;

      return await db.tx(async (t) => {
        // 1. คำนวนราคาและตรวจสอบสินค้า ตัดสต็อกสินค้า
        let totalAmount = 0;
        const orderItems = [];
        // วนเพื่อเอา item ทั้งหมด
        for (const item of items) {
          const product = await t.oneOrNone(
            `SELECT * FROM public.products WHERE id = $1;`,
            [item.id]
          );

          if (!product) {
            throw new Error(`ไม่พบสินค้า ${item.name}`);
          }

          // ตรวจสอบสต็อกพอไหม
          if (product.stock_quantity < item.quantity) {
            throw new Error(`มีสินค้าไม่พอ (เหลือ ${product.stock_quantity})`);
          }

          // รวมราคาไว้
          totalAmount += product.price * item.quantity;

          orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          });

          // update สต็อกสินค้า
          await t.none(
            `UPDATE products SET stock_quantity = stock_quantity - $1, updated_at = NOW() WHERE id = $2`,
            [item.quantity, product.id]
          );
        }

        // 2. สร้างเลข ref การชำระเงิน
        const paymentReference = uuidv4().substring(0, 8).toUpperCase();

        // 3. บันทึก ออเดอร์
        const order = await t.one(
          `
            INSERT INTO orders (
            user_id,
            total_amount,
            payment_reference,
            customer_name,
            customer_email,
            customer_phone,
            customer_address ) VALUES ($1,$2,$3,$4,$5,$6,$7) 
            RETURNING id
          `,
          [userId, totalAmount, paymentReference, name, email, phone, address]
        );

        // 4. บันทึก รายการสินค้าที่สั่งซื่้อ
        for (const item of orderItems) {
          await t.none(
            `INSERT INTO order_items (order_id,product_id,quantity,price_at_time) VALUES ($1,$2,$3,$4)`,
            [order.id, item.productId, item.quantity, item.price]
          );
        }

        const promptpayId = process.env.PROMPTPAY_ID;
        // 5. สร้าง qr code ชำระเงิน
        const qrcodePay = await generatePromptPayQR(promptpayId, total);

        // 6. บันทึกข้อมูลการชำระเงิน
        await t.none(
          `INSERT INTO payment_transactions (order_id,qrcode_data,amount,transaction_reference) VALUES ($1,$2,$3,$4)`,
          [order.id, qrcodePay, totalAmount, paymentReference]
        );

        // 7. ส่งข้อมูลกลับ
        return {
          success: true,
          orderId: order.id,
          paymentReference,
          totalAmount,
          qrcodeUrl: qrcodePay,
          promptpayId,
        };

      });

    } catch (error) {
      console.log("🚀 ~ CreateOrderAndQrCode: ~ error:", error);
      throw new Error(error.message || "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
    }
  },
};
