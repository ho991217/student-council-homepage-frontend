import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  span:first-child {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.gray400};
  }
  span:last-child {
    color: ${({ theme }) => theme.colors.gray200};
  }
`;

function CopyrightTerm(): JSX.Element {
  return (
    <Container>
      <span>
        경기도 용인시 수지구 죽전동 1491 단국대학교 혜당관 406호 총학생회실
      </span>
      <span>COPYRIGHT(C)2022 DANKOOK UNIVERSITY ALL RIGHTS RESERVERD</span>
    </Container>
  );
}

export default CopyrightTerm;
