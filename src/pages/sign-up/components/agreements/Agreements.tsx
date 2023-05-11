import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import qs, { ParsedQs } from 'qs';
import { AgreementDocs } from './AgreementDocs';
import { Term } from './AgreementType';
import TermBlock from './TermBlock';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  ${({ theme }) => theme.media.desktop} {
    margin: 100px 0;
  }
`;

const TitleContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  ${({ theme }) => theme.media.desktop} {
    width: 800px;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
`;

const AgreeAll = styled.label`
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  display: flex;
  align-items: center;
  > input {
    margin-right: 0.5rem;
    user-select: none;
  }
`;

const NextBtn = styled.button`
  all: unset;
  width: 95%;
  ${({ theme }) => theme.media.desktop} {
    width: 350px;
  }
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
  :disabled {
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: default;
  }
`;

function Agreements() {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [terms, setTerms] = useState<Term[]>(AgreementDocs);
  const [redirectUri, setRedirectUri] = useState<ParsedQs | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setRedirectUri(
      qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }),
    );
  }, []);

  useEffect(() => {
    if (isAllAgreed) {
      terms.forEach(({ id }) => {
        setTerms((prev) =>
          prev.map((term) =>
            term.id === id && !term.agreed ? { ...term, agreed: true } : term,
          ),
        );
      });
    } else {
      terms.forEach(({ id }) => {
        setTerms((prev) =>
          prev.map((term) =>
            term.id === id && term.agreed ? { ...term, agreed: false } : term,
          ),
        );
      });
    }
  }, [isAllAgreed]);

  useEffect(() => {
    const didAllAgreed = terms.every((term) => term.agreed);
    setIsAllAgreed(didAllAgreed);
  }, [terms]);

  return (
    <Container>
      <TitleContainer>
        <Title>이용약관동의</Title>
        <AgreeAll>
          <input
            type="checkbox"
            checked={isAllAgreed}
            onChange={() => {
              setIsAllAgreed((prev) => !prev);
            }}
          />
          전체동의하기
        </AgreeAll>
      </TitleContainer>
      {terms.map((term) => (
        <TermBlock
          key={term.id}
          setAgreed={() => {
            setTerms((prev) =>
              prev.map((prevTerm) =>
                prevTerm.id === term.id
                  ? { ...prevTerm, agreed: !prevTerm.agreed }
                  : prevTerm,
              ),
            );
          }}
          agreed={term.agreed}
          type={term.type}
          title={term.title}
          content={term.content}
          details={term.details}
          notice={term.notice}
          id={term.id}
        />
      ))}
      <NextBtn
        disabled={!isAllAgreed}
        onClick={() => {
          navigate(
            `/sign-up/verification${
              redirectUri?.redirect ? `?redirect=${redirectUri.redirect}` : ''
            }`,
          );
        }}
      >
        동의 완료
      </NextBtn>
    </Container>
  );
}

export default Agreements;
