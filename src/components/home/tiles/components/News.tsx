import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NewsProps } from 'components/home/tiles/TileProps';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 7px;
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

// TODO: detail 내용 동적으로 바꾸기
function News(): JSX.Element {
  const [news, setNews] = useState<NewsProps[]>([]);

  useEffect(() => {
    axios
      .get('/api/main')
      .then(function (response) {
        const result = response.data.data;
        setNews(result.recentNews.slice(0, 4));
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      {news.map((news) => (
        <P key={news.id}>
          <Link to={`/news?id=${news.id}`}>{news.title}</Link>
        </P>
      ))}
    </Wrapper>
  );
}

export default News;
