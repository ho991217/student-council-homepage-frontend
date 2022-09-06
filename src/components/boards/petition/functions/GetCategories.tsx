import axios from 'axios';

export const getCategories = async (token: string) => {
  const { data } = await axios({
    method: 'get',
    url: '/api/category',
    headers: {
      'X-AUTH-TOKEN': token,
    },
  });
  //   if (data.successful) {
  return data.data;
  //   } else {
  // 실패했을 때
  //   }
};
