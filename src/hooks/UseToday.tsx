export const useToday = (format: string) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayList[day];

  const result = format
    .replace(/yyyy/g, year.toString())
    .replace(/MM/g, month.toString())
    .replace(/dd/g, date.toString())
    .replace(/HH/g, hour.toString())
    .replace(/mm/g, minute.toString())
    .replace(/ss/g, second.toString())
    .replace(/E/g, dayName);
  return result;
};
