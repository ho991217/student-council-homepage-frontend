import { KeyboardEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 12px;
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
  const [searchWord, setSearchWord] = useState<string>('');
  const params = useSearchParams();
  const navigate = useNavigate();

  const onSearchWordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearchWord(value);
  };

  const onSearchButtonHandler = () => {
    let { filter } = qs.parse(params[0].toString());

    if (!filter) filter = '';

    navigate(
      `/board-suggestion/boards?page=1&filter=${filter}&query=${searchWord}`,
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchButtonHandler();
    }
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default TopBar;
