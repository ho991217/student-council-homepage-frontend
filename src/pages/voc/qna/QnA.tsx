import styled from 'styled-components';
import { KeyboardEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PageControl, { PagingProps } from 'components/PageControl';
import SideNav from 'components/nav/SideNav';
import qs from 'qs';
import Board from './components/Board';
import { PostProps } from './PostProps';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  max-width: 1280px;
  position: relative;
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.base};
  width: 90px;
  height: 30px;
  padding-left: 8px;
  color: black;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const ArrowSvg = styled.svg`
  margin-left: -18px;
  margin-right: 10px;
  align-self: center;
  width: 12px;
  height: 12px;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  margin-right: 5px;
  ::placeholder {
    padding-left: 5px;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: right;
  position: absolute;
  ${({ theme }) => theme.media.desktop} {
    top: 120px;
    right: 60px;
  }
  ${({ theme }) => theme.media.tablet} {
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
  }

  ${({ theme }) => theme.media.mobile} {
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
  }
`;

const SearchButton = styled.button`
  all: unset;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  border-radius: 5px;
  width: 65px;
  height: 30px;
  cursor: pointer;
`;
function QnA(): JSX.Element {
  const [board, setBoard] = useState<PostProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(0);
  const [pagingInfo, setPagingInfo] = useState<PagingProps>({
    first: true,
    hasNext: false,
    last: true,
    page: 1,
    size: 6,
    totalElements: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>('');
  const getPosts = async () => {
    let { page } = qs.parse(searchParams.toString());

    if (!page) page = '1';
    const { data } = await axios({
      method: 'get',
      url: `/post/voc?page=${Number(page) - 1}`,
    });
    setBoardsCount(data.totalElements);
    setBoard([...data.content]);
    setPagingInfo(data);
  };

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
    getPosts();
    if (searchWord === '') {
      getPosts();
    }
  }, [searchParams, boardsCount]);

  const onSearchWordHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchWord(value);
  };

  const onSearchButtonHandler = async () => {
    await axios
      .get(`/post/voc?&query=${searchWord}`)
      .then(function (response) {
        const result = response.data;
        setBoard(result.content.slice((page - 1) * 6, page * 6));
        setBoardsCount(result.totalElements);
        setPagingInfo(result);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchButtonHandler();
    }
  };
  return (
    <Wrapper>
      <SideNav margin="50px 0 0 50px" />
      <Container>
        <Search>
          <Select>
            <option value="ALL">ALL</option>
          </Select>
          <ArrowSvg
            width="7"
            height="4"
            viewBox="0 0 7 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33366 4L0.446906 0.249999L6.22041 0.25L3.33366 4Z"
              fill="#C4C4C4"
            />
          </ArrowSvg>
          <Input
            type="text"
            value={searchWord}
            placeholder="검색어를 입력해 주세요."
            onChange={onSearchWordHandler}
            onKeyPress={handleKeyPress}
          />
          <SearchButton type="button" onClick={onSearchButtonHandler}>
            검색
          </SearchButton>
        </Search>
        <Board posts={board} pagingInfo={pagingInfo} currentPage={page} />
        <PageControl pagingInfo={pagingInfo} currentPage={page} />
      </Container>
    </Wrapper>
  );
}

export default QnA;
