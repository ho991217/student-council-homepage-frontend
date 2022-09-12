import { KeyboardEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-divs: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const Items = styled.div`
  display: flex;
`;

const Select = styled.select`
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

const ArrowSvg = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 10px;
  height: 10px;
`;

const Input = styled.input`
  width: 200px;
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

function MobileTopBar() {
  const [status, setStatus] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('');
  const params = useSearchParams();
  const navigate = useNavigate();

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value);

    let { filter } = qs.parse(params[0].toString());
    let { query } = qs.parse(params[0].toString());

    if (!filter) filter = '';
    if (!query) query = '';

    navigate(
      `/board-free/boards?page=1&filter=${filter}&status=${e.currentTarget.value}&query=${query}`,
    );
  }

  const onSearchWordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearchWord(value);
  };

  const onSearchButtonHandler = () => {
    let { filter } = qs.parse(params[0].toString());
    let { status } = qs.parse(params[0].toString());

    if (!filter) filter = '';
    if (!status) status = '';

    navigate(
      `/board-free/boards?page=1&filter=${filter}&status=${status}&query=${searchWord}`,
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchButtonHandler();
    }
  };

  return (
    <Wrapper>
      <Items>
        <Select
          name="category"
          id="category"
          value={status}
          defaultValue=""
          onChange={onSelectHandler}
        >
          <option value="전체">전체</option>
          <option value="진행중">진행중</option>
          <option value="답변완료">답변완료</option>
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
      </Items>
      <Items>
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
      </Items>
    </Wrapper>
  )
}

export default MobileTopBar