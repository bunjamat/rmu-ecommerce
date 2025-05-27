import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

 // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.
dayjs.extend(buddhistEra); 

 
/* 07 กุมภาพันธ์ 2566 */
export const DateLongTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMMM BBBB");
};
 
/* 07 ก.พ. 2566 */
export const DateShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD MMM BB");
};
 
/* 07 February 2023 */
export const DateLongEN = (date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMMM YYYY");
};
 
/* 07 Feb 23 */
export const DateShortEN = (date) => {
  dayjs.locale("en");
  return dayjs(date).format("DD MMM YY");
};

// 
/*20230707_120000 */
export const DateExport = (date) => {
  dayjs.locale("en");
  return dayjs(date).format("YYYYMMDD_HHmmss");
};