import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
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

interface BoardProps {
  totalBoards: number;
  currentPage: number;
}

function TopBar({ totalBoards, currentPage }: BoardProps): JSX.Element {
  const [searchWord, setSearchWord] = useState<string>('');

  const onSearchWordHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchWord(value);
  };

  return (
    <Container>
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
          총 게시물 <PointText>{totalBoards}건</PointText>, 페이지{' '}
          <PointText>{currentPage}</PointText>/{' '}
          {totalBoards < 1 ? 1 : Math.ceil(totalBoards / 6)}
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
          />
          <Button type="button">검색</Button>
        </Search>
      </Wrapper>
    </Container>
  );
}

export default TopBar;
