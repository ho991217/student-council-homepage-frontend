import axios from 'axios';

export const getCategories = async () => {
  const { data } = await axios({
    method: 'get',
    url: '/post/tag',
  });
  return data.data;
};
