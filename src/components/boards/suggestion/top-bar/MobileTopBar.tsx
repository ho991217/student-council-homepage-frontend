import { KeyboardEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 190px;
  height: 30px;
  margin-right: 3px;
  ::placeholder {
    padding-left: 3px;
  }
  border: 1px solid ${({ theme }) => theme.colors.gray400};
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
  width: 50px;
  height: 30px;
  cursor: pointer;
`;

function MobileTopBar() {
  const [searchWord, setSearchWord] = useState<string>('');
  const params = useSearchParams();
  const navigate = useNavigate();

  const onSearchWordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setSearchWord(value);
  };

  const onSearchBtnHandler = () => {
    let { filter } = qs.parse(params[0].toString());
    if (!filter) filter = '';

    setSearchWord('');
    navigate(
      `/board-suggestion/boards?page=1&filter=${filter}&query=${searchWord}`,
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchBtnHandler();
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
      <Button type="button" onClick={onSearchBtnHandler}>
        검색
      </Button>
    </Wrapper>
  );
}

export default MobileTopBar