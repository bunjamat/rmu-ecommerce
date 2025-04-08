import generatePayload from "promptpay-qr";
import QRCode from "qrcode";
export async function generatePromptPayQR(promptpayId, amount) {
  
  // สร้าง  payload สำหรับ promptpay QR
  const payload = generatePayload(promptpayId, {
    amount,
  });
  // สร้าง QR code เป็น รูปภาพ
  const qrCodeDataURL = await QRCode.toDataURL(payload, {
    width: 400,
    margin: 4,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
  return qrCodeDataURL;
}
