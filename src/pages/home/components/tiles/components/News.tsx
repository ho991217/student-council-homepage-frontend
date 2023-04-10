import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RecentNewsType } from 'pages/home/Home';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  margin-bottom: 7px;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

function News({ news }: { news: RecentNewsType[] }): JSX.Element {
  return (
    <Wrapper>
      {news.map((news) => (
        <P key={news.id}>
          <Link to={`post?id=${news.id}`}>{news.title}</Link>
        </P>
      ))}
    </Wrapper>
  );
}

export default News;
