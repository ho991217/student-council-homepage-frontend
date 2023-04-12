import axios from 'axios';
import Carousel from 'pages/home/components/carousel/Carousel';
import { ImageProps } from 'pages/home/components/carousel/CarouselProps';
import Tiles, { TilesProps } from 'pages/home/components/tiles/Tiles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export interface PetitonType {
  d_day: number;
  id: number;
  petitionStatus: string;
  title: string;
}

export interface RecentConferencesType {
  id: number;
  title: string;
}

export interface RecentNewsType {
  id: number;
  title: string;
}

function Home() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [petition, setPetition] = useState<PetitonType[]>([
    {
      d_day: 0,
      id: 0,
      petitionStatus: '',
      title: '',
    },
  ]);
  const [conference, setConference] = useState<RecentConferencesType[]>([
    {
      id: 0,
      title: '',
    },
  ]);
  const [news, setNews] = useState<RecentNewsType[]>([
    {
      id: 0,
      title: '',
    },
  ]);

  const getEveryInfo = async () => {
    const { data } = await axios({
      method: 'get',
      url: '/main',
    });

    const { carousels, popularPetitions, recentConferences, recentNews } = data;

    setImages(carousels);
    setPetition(popularPetitions.slice(0, 4));
    setConference(recentConferences.slice(0, 4));
    setNews(recentNews.slice(0, 4));
  };

  useEffect(() => {
    getEveryInfo();
  }, []);

  return (
    <Wrapper>
      <Carousel images={images} />
      <Tiles
        popularPetitions={petition}
        recentConferences={conference}
        recentNews={news}
      />
    </Wrapper>
  );
}

export default Home;
