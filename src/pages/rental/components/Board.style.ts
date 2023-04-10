import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
  margin-bottom: 2rem;
  position: relative;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1.5fr;
  height: 70px;
  width: 100%;
  padding: 10px 0;
`;

const Index = styled(Row)`
  border-top: 3px solid ${({ theme }) => theme.colors.gray900};
  div {
    border-left: 1px solid ${({ theme }) => theme.colors.gray200};
    :first-child {
      border-left: none;
    }
    :last-child {
      border-right: none;
    }
  }
`;

const Item = styled(Row)`
  cursor: pointer;
`;

const Col = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoardComponents = {
  BoardContainer,
  Index,
  Item,
  Col,
};
