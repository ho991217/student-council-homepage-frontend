import axios from 'axios';

export const getCategories = async (token: string) => {
  const { data } = await axios({
    method: 'get',
    url: '/api/category',
    headers: {
      'X-AUTH-TOKEN': token,
    },
  });
  return data.data;
};
