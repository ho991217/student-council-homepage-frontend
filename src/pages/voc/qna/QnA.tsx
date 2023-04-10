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
  gap: 30px;
  background-color: white;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 1200px;
  ${({ theme }) => theme.media.desktop} {
    width: calc(100% - 310px);
    margin: 40px 0;
  }
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
  align-items: flex-end;
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

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1290px;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    padding: 20px 50px 20px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 10px 50px 10px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 10px 10px 20px 10px;
    flex-direction: column;
  }
  background-color: #f9f9f9;
  padding: 0 58px;
  border-radius: 10px;
  margin-bottom: 28px;
`;

const PHead = styled.div`
  width: 42px;
  border-top: 4px solid #1d64aa;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  padding-top: 4px;
`;

const PDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  gap: 10px;
  margin: 11px 0;
`;

function QnA() {
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
      <SideNav />
      <Container>
        <InfoBox>
          <div>
            <PHead>Q&A</PHead>
            <PDiv>
              <p>욕설 및 인신공격성 글은 운영원칙에 따라 삭제합니다.</p>
              <p>
                등재된 글은 원칙적으로 삭제할 수 없음에 유념하여 작성하여 주시기
                바랍니다.
              </p>
              <p>
                작성된 내용 중 개인정보는{' '}
                <span style={{ color: 'red' }}>블라인드(*)</span>로 처리됩니다.
              </p>
            </PDiv>
          </div>
          <Search>
            <Select>
              <option value="title">제목</option>
              <option value="body">내용</option>
              <option value="all">제목+내용</option>
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
        </InfoBox>
        <Board posts={board} pagingInfo={pagingInfo} currentPage={page} />
        <PageControl pagingInfo={pagingInfo} currentPage={page} />
      </Container>
    </Wrapper>
  );
}

export default QnA;
