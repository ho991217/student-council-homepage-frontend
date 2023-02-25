import axios from 'axios';
/** 전화번호를 입력받아 인증문자를 보내주는 함수 */
export const sendSMSCode = async (phoneNumber: string) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `/api/auth/sms-code?phone=${phoneNumber}`,
    });
    return data.token;
  } catch (e) {
    return e;
  }
};
