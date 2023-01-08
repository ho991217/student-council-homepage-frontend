/** 전화번호를 입력받아서 하이픈을 삭제해서 반환하는 함수 */
export const RemoveHyphen = (phoneNumber: string) => {
  if (phoneNumber.includes('-')) return phoneNumber.replaceAll('-', '');
  return phoneNumber;
};
