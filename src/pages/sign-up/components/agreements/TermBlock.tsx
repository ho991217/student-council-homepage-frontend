/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import { useState } from 'react';
import { Term } from './AgreementType';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 3px;
  border: 2px solid #e6e6e6;
  padding-top: 1.5rem;
  width: 800px;
  margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  padding-left: 0.6rem;
  > label {
    display: flex;
    align-items: center;
  }
  * {
    margin: 0 0.25rem;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

const TypeLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const Title = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const Acordian = styled.svg<{ open: boolean }>`
  cursor: pointer;
  margin-right: 1.5rem;
  transform: rotateX(${({ open }) => (open ? '0deg' : '180deg')});
  fill: none;
  width: 20px;
  height: 15px;
`;

const Content = styled.span`
  border-bottom: 2px solid #e6e6e6;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 2rem;
  line-height: 1.2rem;
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  font-size: ${({ theme }) => theme.fonts.size.base};
`;

const DetailedContent = styled.div<{ open: boolean; detailCount: number }>`
  width: 100%;
  padding: 1.5rem 0.8rem;
  display: ${({ open }) => (open ? 'grid' : 'none')};
  user-select: none;
  grid-template-columns: repeat(${({ detailCount }) => detailCount}, 1fr);
  grid-gap: 1rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailTitle = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.base};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

const DetailContent = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  font-size: ${({ theme }) => theme.fonts.size.base};
  line-height: 1.2rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Notice = styled.div<{ open: boolean }>`
  width: 100%;
  padding: 1.5rem 0.8rem;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  font-size: ${({ theme }) => theme.fonts.size.base};
  line-height: 1.2rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

interface TermBlockProps extends Term {
  setAgreed: () => void;
}

function TermBlock({
  type,
  title,
  content,
  details,
  notice,
  agreed,
  setAgreed,
}: TermBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <HeaderContainer>
        <label>
          <Checkbox checked={agreed} onChange={setAgreed} />
          <TypeLabel>({type})</TypeLabel>
          <Title>{title}</Title>
        </label>
        <Acordian
          viewBox="0 0 27 15"
          open={isOpen}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <path
            d="M1 14L12.7792 1.74967C13.1726 1.34048 13.8274 1.34048 14.2208 1.74967L26 14"
            stroke="#E0E0E0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Acordian>
      </HeaderContainer>
      <Content>{content}</Content>
      <DetailedContent open={isOpen} detailCount={details.length}>
        {details.map((detail) => (
          <DetailContainer key={detail.title}>
            <DetailTitle>{detail.title}</DetailTitle>
            <DetailContent>{detail.content}</DetailContent>
          </DetailContainer>
        ))}
      </DetailedContent>
      <Notice open={isOpen}>{notice}</Notice>
    </Container>
  );
}

export default TermBlock;
