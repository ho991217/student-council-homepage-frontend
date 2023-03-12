import axios from 'axios';

interface ValidationError {
  response: {
    data: {
      message: string;
      successful: boolean;
    };
  };
}

export const validateSMSCode = async (token: string, code: string) => {
  const data = JSON.stringify({ token, code });

  try {
    const res = await axios({
      method: 'post',
      url: '/auth/sms-code',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    return res.data;
  } catch (error) {
    const err = error as ValidationError;
    return err.response.data;
  }
};
