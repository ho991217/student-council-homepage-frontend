import styled from 'styled-components';

function SubmitButton({ text }: { text: string }) {
  return (
    <Wrapper>
      <Input value={text} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* margin: auto; */
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const Input = styled.input.attrs({ type: 'submit' })`
  width: 75px;
  height: 35px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.size.base};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  border-radius: 5px;
`;

export default SubmitButton;
