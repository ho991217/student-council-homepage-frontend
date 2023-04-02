import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const useMyInfo = () => {
  const [cookies] = useCookies();
  const [myInfo, setMyInfo] = useState({
    studentName: 'string',
    yearOfAdmission: 'string',
    major: 'string',
  });

  const getMyInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: '/user',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
      },
    });
    setMyInfo(data);
  };

  useEffect(() => {
    getMyInfo();
  }, [cookies]);

  return [myInfo];
};
