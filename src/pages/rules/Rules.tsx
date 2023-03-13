import React, { KeyboardEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Desktop, Mobile, Tablet } from 'hooks/MediaQueries';
import styled from 'styled-components';
import axios from 'axios';
import { PagingProps } from 'components/PageControl';
import qs from 'qs';

import { RuleProps } from 'pages/rules/components/RuleProps';

import PageControl from 'pages/rules/components/PageControl';
import RulesBoard from 'pages/rules/components/RulesBoard';
import MobileRulesBoard from 'pages/rules/components/mobile/RulesBoard';
import GlobalBanner from 'components/banner/GlobalBanner';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Wrapper = styled.div`
  max-width: 1190px;
  width: 100%;
  padding: 35px 60px;
  margin: 0 50px;
  background-color: ${({ theme }) => theme.colors.gray020};
`;

const PageInfo = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  font-size: ${({ theme }) => theme.fonts.size.md};
  user-select: none;
`;

const Svg = styled.svg`
  margin: 0 15px 0 3px;
`;

const Search = styled.div`
  display: flex;
  justify-content: right;
`;

const PointText = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 3px 0 5px;
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

const Button = styled.button`
  all: unset;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  border-radius: 5px;
  width: 65px;
  height: 30px;
  cursor: pointer;
`;

const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
  margin-top: 15px;
`;

const MobileWrapper = styled.div`
  width: 100%;
`;

const MobilePageInfo = styled.div`
  width: 100%;
  display: flex;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.gray020};
  padding: 10px 40px;
  user-select: none;
`;

const MobileArrowSvg = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 10px;
  height: 10px;
`;

const MobileSearch = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin: 10px 30px;
`;

const MobileSelect = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  width: 90px;
  height: 30px;
  padding-left: 8px;
  color: black;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-right: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  :focus {
    outline: none;
  }
`;

const MobileInput = styled.input`
  width: 250px;
  height: 30px;
  margin-right: 5px;
  ::placeholder {
    padding-left: 5px;
  }
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  border-left: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  :focus {
    outline: none;
  }
`;

function Rules() {
  const [board, setBoard] = useState<RuleProps[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>('');
  const [pagingInfo, setPagingInfo] = useState<PagingProps>({
    first: true,
    hasNext: false,
    last: true,
    page: 1,
    size: 6,
    totalElements: 0,
    totalPages: 1,
  });

  const onSearchWordHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchWord(value);
  };

  const onSearchButtonHandler = async () => {
    await axios
      .get(`/rule?sort=createDate,desc&query=${searchWord}`)
      .then((response) => {
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

  const getPosts = async () => {
    let { page } = qs.parse(searchParams.toString());

    if (!page) page = '1';
    const { data } = await axios({
      method: 'get',
      url: `/rule?page=${Number(page) - 1}&size=6&sort=createDate,desc`,
    });
    setBoardsCount(data.totalElements);
    setBoard([...data.content]);
    setPagingInfo(data);
  };

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);

    if (searchWord === '') {
      getPosts();
    }
  }, [searchParams, boardsCount]);

  return (
    <Container>
      <Desktop>
        <>
          <GlobalBanner title="회칙 및 세칙" detail="회칙 및 세칙 입니다." />
          <TopContainer>
            <Wrapper>
              <PageInfo>
                <Svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V14.5C0 14.8978 0.158035 15.2794 0.43934 15.5607C0.720644 15.842 1.10218 16 1.5 16H10.5C10.8978 16 11.2794 15.842 11.5607 15.5607C11.842 15.2794 12 14.8978 12 14.5V1.5C12 1.10218 11.842 0.720644 11.5607 0.43934C11.2794 0.158035 10.8978 0 10.5 0H1.5ZM8.59 4.992L8.5 5H3.5C3.37505 5.00023 3.25455 4.95367 3.16222 4.86949C3.06988 4.78531 3.01241 4.66961 3.00112 4.54518C2.98984 4.42074 3.02554 4.29659 3.10122 4.19717C3.1769 4.09775 3.28705 4.03026 3.41 4.008L3.5 4H8.5C8.62495 3.99977 8.74545 4.04633 8.83778 4.13051C8.93012 4.21469 8.98759 4.33039 8.99888 4.45482C9.01017 4.57926 8.97446 4.70341 8.89878 4.80283C8.8231 4.90225 8.71295 4.96974 8.59 4.992ZM8.59 8.492L8.5 8.5H3.5C3.37505 8.50023 3.25455 8.45367 3.16222 8.36949C3.06988 8.28531 3.01241 8.16961 3.00112 8.04518C2.98984 7.92074 3.02554 7.79659 3.10122 7.69717C3.1769 7.59775 3.28705 7.53026 3.41 7.508L3.5 7.5H8.5C8.62495 7.49977 8.74545 7.54633 8.83778 7.63051C8.93012 7.71469 8.98759 7.83039 8.99888 7.95482C9.01017 8.07926 8.97446 8.20341 8.89878 8.30283C8.8231 8.40225 8.71295 8.46974 8.59 8.492ZM8.59 11.992L8.5 12H3.5C3.37505 12.0002 3.25455 11.9537 3.16222 11.8695C3.06988 11.7853 3.01241 11.6696 3.00112 11.5452C2.98984 11.4207 3.02554 11.2966 3.10122 11.1972C3.1769 11.0977 3.28705 11.0303 3.41 11.008L3.5 11H8.5C8.62495 10.9998 8.74545 11.0463 8.83778 11.1305C8.93012 11.2147 8.98759 11.3304 8.99888 11.4548C9.01017 11.5793 8.97446 11.7034 8.89878 11.8028C8.8231 11.9023 8.71295 11.9697 8.59 11.992Z"
                    fill="#79C0D5"
                  />
                </Svg>
                총 게시물 <PointText>{boardsCount}건</PointText>, 페이지{' '}
                <PointText>{page}</PointText>/{' '}
                {boardsCount < 1 ? 1 : Math.ceil(boardsCount / 6)}
              </PageInfo>
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
                <Button type="button" onClick={onSearchButtonHandler}>
                  검색
                </Button>
              </Search>
            </Wrapper>
          </TopContainer>
        </>
      </Desktop>
      <Tablet>
        <>
          <GlobalBanner title="회칙 및 세칙" detail="회칙 및 세칙 입니다." />
          <TopContainer>
            <Wrapper>
              <PageInfo>
                <Svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V14.5C0 14.8978 0.158035 15.2794 0.43934 15.5607C0.720644 15.842 1.10218 16 1.5 16H10.5C10.8978 16 11.2794 15.842 11.5607 15.5607C11.842 15.2794 12 14.8978 12 14.5V1.5C12 1.10218 11.842 0.720644 11.5607 0.43934C11.2794 0.158035 10.8978 0 10.5 0H1.5ZM8.59 4.992L8.5 5H3.5C3.37505 5.00023 3.25455 4.95367 3.16222 4.86949C3.06988 4.78531 3.01241 4.66961 3.00112 4.54518C2.98984 4.42074 3.02554 4.29659 3.10122 4.19717C3.1769 4.09775 3.28705 4.03026 3.41 4.008L3.5 4H8.5C8.62495 3.99977 8.74545 4.04633 8.83778 4.13051C8.93012 4.21469 8.98759 4.33039 8.99888 4.45482C9.01017 4.57926 8.97446 4.70341 8.89878 4.80283C8.8231 4.90225 8.71295 4.96974 8.59 4.992ZM8.59 8.492L8.5 8.5H3.5C3.37505 8.50023 3.25455 8.45367 3.16222 8.36949C3.06988 8.28531 3.01241 8.16961 3.00112 8.04518C2.98984 7.92074 3.02554 7.79659 3.10122 7.69717C3.1769 7.59775 3.28705 7.53026 3.41 7.508L3.5 7.5H8.5C8.62495 7.49977 8.74545 7.54633 8.83778 7.63051C8.93012 7.71469 8.98759 7.83039 8.99888 7.95482C9.01017 8.07926 8.97446 8.20341 8.89878 8.30283C8.8231 8.40225 8.71295 8.46974 8.59 8.492ZM8.59 11.992L8.5 12H3.5C3.37505 12.0002 3.25455 11.9537 3.16222 11.8695C3.06988 11.7853 3.01241 11.6696 3.00112 11.5452C2.98984 11.4207 3.02554 11.2966 3.10122 11.1972C3.1769 11.0977 3.28705 11.0303 3.41 11.008L3.5 11H8.5C8.62495 10.9998 8.74545 11.0463 8.83778 11.1305C8.93012 11.2147 8.98759 11.3304 8.99888 11.4548C9.01017 11.5793 8.97446 11.7034 8.89878 11.8028C8.8231 11.9023 8.71295 11.9697 8.59 11.992Z"
                    fill="#79C0D5"
                  />
                </Svg>
                총 게시물 <PointText>{boardsCount}건</PointText>, 페이지{' '}
                <PointText>{page}</PointText>/{' '}
                {boardsCount < 1 ? 1 : Math.ceil(boardsCount / 6)}
              </PageInfo>
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
                <Button type="button" onClick={onSearchButtonHandler}>
                  검색
                </Button>
              </Search>
            </Wrapper>
          </TopContainer>
        </>
      </Tablet>
      <Mobile>
        <>
          <GlobalBanner title="회칙 및 세칙" detail="회칙 및 세칙 입니다." />
          <MobileContainer>
            <MobileWrapper>
              <MobileSearch>
                <MobileSelect>
                  <option value="ALL">ALL</option>
                </MobileSelect>
                <MobileArrowSvg
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
                </MobileArrowSvg>
                <MobileInput
                  type="text"
                  value={searchWord}
                  placeholder="검색어를 입력해 주세요."
                  onChange={onSearchWordHandler}
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" onClick={onSearchButtonHandler}>
                  검색
                </Button>
              </MobileSearch>
              <MobilePageInfo>
                <Svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 0C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V14.5C0 14.8978 0.158035 15.2794 0.43934 15.5607C0.720644 15.842 1.10218 16 1.5 16H10.5C10.8978 16 11.2794 15.842 11.5607 15.5607C11.842 15.2794 12 14.8978 12 14.5V1.5C12 1.10218 11.842 0.720644 11.5607 0.43934C11.2794 0.158035 10.8978 0 10.5 0H1.5ZM8.59 4.992L8.5 5H3.5C3.37505 5.00023 3.25455 4.95367 3.16222 4.86949C3.06988 4.78531 3.01241 4.66961 3.00112 4.54518C2.98984 4.42074 3.02554 4.29659 3.10122 4.19717C3.1769 4.09775 3.28705 4.03026 3.41 4.008L3.5 4H8.5C8.62495 3.99977 8.74545 4.04633 8.83778 4.13051C8.93012 4.21469 8.98759 4.33039 8.99888 4.45482C9.01017 4.57926 8.97446 4.70341 8.89878 4.80283C8.8231 4.90225 8.71295 4.96974 8.59 4.992ZM8.59 8.492L8.5 8.5H3.5C3.37505 8.50023 3.25455 8.45367 3.16222 8.36949C3.06988 8.28531 3.01241 8.16961 3.00112 8.04518C2.98984 7.92074 3.02554 7.79659 3.10122 7.69717C3.1769 7.59775 3.28705 7.53026 3.41 7.508L3.5 7.5H8.5C8.62495 7.49977 8.74545 7.54633 8.83778 7.63051C8.93012 7.71469 8.98759 7.83039 8.99888 7.95482C9.01017 8.07926 8.97446 8.20341 8.89878 8.30283C8.8231 8.40225 8.71295 8.46974 8.59 8.492ZM8.59 11.992L8.5 12H3.5C3.37505 12.0002 3.25455 11.9537 3.16222 11.8695C3.06988 11.7853 3.01241 11.6696 3.00112 11.5452C2.98984 11.4207 3.02554 11.2966 3.10122 11.1972C3.1769 11.0977 3.28705 11.0303 3.41 11.008L3.5 11H8.5C8.62495 10.9998 8.74545 11.0463 8.83778 11.1305C8.93012 11.2147 8.98759 11.3304 8.99888 11.4548C9.01017 11.5793 8.97446 11.7034 8.89878 11.8028C8.8231 11.9023 8.71295 11.9697 8.59 11.992Z"
                    fill="#79C0D5"
                  />
                </Svg>
                총 게시물 <PointText>{boardsCount}건</PointText>, 페이지{' '}
                <PointText>{page}</PointText>/ {Math.ceil(boardsCount / 6)}
              </MobilePageInfo>
            </MobileWrapper>
          </MobileContainer>
        </>
      </Mobile>

      <Desktop>
        <RulesBoard posts={board} pagingInfo={pagingInfo} currentPage={page} />
      </Desktop>
      <Tablet>
        <RulesBoard posts={board} pagingInfo={pagingInfo} currentPage={page} />
      </Tablet>
      <Mobile>
        <MobileRulesBoard
          posts={board}
          pagingInfo={pagingInfo}
          currentPage={page}
        />
      </Mobile>

      <PageControl pagingInfo={pagingInfo} currentPage={page} />
    </Container>
  );
}

export default Rules;
