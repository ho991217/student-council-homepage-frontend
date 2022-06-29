import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 17px;
`;

const P = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-bottom: 7px;
`;

// TODO: detail 내용 동적으로 바꾸기
function Proceeding(): JSX.Element {
  return (
    <Wrapper>
      <P>[중앙운영위원회 n차 2022.00.00]</P>
      <P>[총학생운영위원회 n차 2022.00.00]</P>
    </Wrapper>
  );
}

export default Proceeding;
