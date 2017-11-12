/**
 * Created by Administrator on 2017/4/3.
 */
export function getDate(beforeToday) {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate() - beforeToday;
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  let str = '' + year + '' + month + '' + day;
  return str;
};