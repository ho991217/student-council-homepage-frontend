import axios from 'axios';

/** 캐러셀 이미지를 가져오는 비동기 함수 */
export const getCarouselImages = async () => {
  return axios({
    url: '/carousel',
    method: 'get',
  });
};
