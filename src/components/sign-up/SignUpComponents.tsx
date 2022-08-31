import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 850px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 2rem;
`;

export const Header = styled.div`
  margin: 40px 0 15px 0;
  max-width: 1400px;
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

export const HeaderPoint = styled.div`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const InnerContainerByStudentNum = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 270px;
  ${({ theme }) => theme.media.mobile} {
    height: 350px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 5px;
    span {
      font-size: ${({ theme }) => theme.fonts.size.sm};
    }
  }
  background-color: ${({ theme }) => theme.colors.gray040};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;

  span {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const InputContainer = styled.form`
  display: flex;
  height: 60px;
  width: 540px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 40px;
  }

  ${({ theme }) => theme.media.tablet} {
    margin-right: 5px;
  }
  ${({ theme }) => theme.media.desktop} {
    margin-right: 15px;
  }
`;

export const VerifyStduentButton = styled.input`
  all: unset;
  width: 100px;
  height: 80%;
  background-color: ${(props) =>
    props.value === 'active'
      ? ({ theme }) => theme.colors.secondary
      : ({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: ${(props) => (props.value === 'active' ? 'pointer' : 'default')};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;
