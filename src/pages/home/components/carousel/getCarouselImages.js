import axios from 'axios';

export const getCarouselImages = () => {
  return axios({
    url: '/main/carousel',
    method: 'get',
  });
};
