import styled from 'styled-components';
import qs from 'qs';
import { useCookies } from 'react-cookie';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories } from '../functions/GetCategories';

const Container = styled.div`
  ${({ theme }) => theme.media.mobile} {
    /* padding: 0px 50px; */
    width: 100vw;
    height: 50px;
    overflow: scroll;
    justify-content: center;
  }
  margin: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  scrollbar-width: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  a:first-child {
    margin-left: 30px;
  }
  a:last-child {
    margin-right: 30px;
  }
`;

const Hashtag = styled(Link)<{ $cur: boolean }>`
  background-color: ${({ $cur, theme }) =>
    $cur ? theme.colors.accent : theme.colors.gray050};
  color: ${({ $cur, theme }) =>
    $cur ? theme.colors.white : theme.colors.gray700};
  ${({ theme }) => theme.media.mobile} {
    min-width: 90px;
    min-height: 40px;
    font-size: ${({ theme }) => theme.fonts.size.md};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 0px 5px;
  border-radius: 25px;
  font-size: ${({ theme }) => theme.fonts.size.base};
`;

function FilterControl() {
  const [categoryList, setCategoryList] = useState<[]>();
  const [params] = useSearchParams();
  const [cookies] = useCookies(['X-AUTH-TOKEN']);

  const generateParams = (tag: string) => {
    if (tag === '전체') {
      return `/board-petition/boards?page=1`;
    }
    return `/board-petition/boards?page=1&filter=${tag}`;
  };

  useEffect(() => {
    getCategories(cookies['X-AUTH-TOKEN']).then((res) => setCategoryList(res));
  }, []);
  return (
    <Container>
      <Hashtag
        $cur={!qs.parse(params.toString())?.filter}
        to={generateParams('전체')}
      >
        #전체
      </Hashtag>
      {categoryList?.map((tag) => (
        <Hashtag
          key={tag}
          $cur={tag === qs.parse(params.toString())?.filter}
          to={generateParams(tag)}
        >
          #{tag}
        </Hashtag>
      ))}
    </Container>
  );
}

export default FilterControl;
