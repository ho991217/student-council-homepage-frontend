import { KeyboardEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Items = styled.div`
  display: flex;
`;

const Select = styled.select`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  background-color: ${({ theme }) => theme.colors.gray040};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  width: 90px;
  height: 30px;
  padding-left: 8px;
  color: black;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Icon = styled.div`
  margin-left: -18px;
  margin-right: 10px;
  align-self: center;
  width: 12px;
  height: 15px;
  ${({ theme }) => theme.media.mobile} {
    height: 12px;
  }
  cursor: pointer;
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

function TopBar() {
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
    if (query === '') {
      navigate(
        `/board-free/boards?page=1&filter=${filter}&status=${e.currentTarget.value}`,
      );
    }
    navigate(
      `/board-free/boards?page=1&filter=${filter}&status=${e.currentTarget.value}&query=${query}`,
    );
  };

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
        <Icon>
          <MdKeyboardArrowDown />
        </Icon>
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
  );
}

export default TopBar;
