import React from 'react';
import styled from 'styled-components';
import CheckIcon from './CheckIcon';
import { Bears } from './data';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: #ffffff;

  margin: 30px 238px 83px 238px;

  ${({ theme }) => theme.media.tablet} {
    margin: 30px 100px 83px 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 30px 0 83px 0;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 10px 0px;

  background: #e9d2f1;

  h2 {
    font-size: 18px;
    font-family: Cafe24Ohsquare;
  }
  h1 {
    font-size: 30px;
    font-family: rixdongnimgothic-pro;

    color: #721b9c;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-family: Cafe24Ohsquare;
`;

const Vote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0px 50px 0px;
`;

const Candidates = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  padding: 30px 70px;

  ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const Candidate = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: ${(p) =>
    p.isSelected ? 'rgba(233, 210, 241, 0.32)' : '#ffffff'};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  border: ${(p) => (p.isSelected ? '1px solid #721B9C' : 'none')};

  cursor: pointer;

  img {
    width: 100%;
    margin: 12px 0px;
  }
  span {
    width: 60%;
    margin: 0 auto;
    text-align: center;
    font-family: rixdongnimgothic-pro;
    font-size: 20px;

    color: ${(p) => (p.isSelected ? '#721B9C' : '#000000')};
  }
`;

const DetailButton = styled.button`
  position: relative;
  top: 18px;
  width: 80%;
  padding: 3px 0px;

  margin: 0 auto;
  background: #e9d2f1;
  border-radius: 20px;
  border: none;

  color: #ffffff;

  font-size: 18px;

  cursor: pointer;
`;

const Description = styled.p`
  text-align: center;

  font-weight: 600;
  font-size: 16px;

  color: #721b9c;
`;

const VoteButton = styled.button<{ isDisabled: boolean }>`
  width: 40%;
  margin: 10px auto 30px auto;

  padding: 8px 0px;

  background: ${(p) => (p.isDisabled ? '#9b9b9b' : '#721B9C')};
  border-radius: 10px;
  border: none;

  font-size: 24px;
  color: #ffffff;
`;

function VoteContainer() {
  return (
    <Container>
      <TitleBlock>
        <h2>단국대학교 캐릭터 스타일링 공모전 </h2>
        <h1>당신의 곰에게 투표하세요!</h1>
      </TitleBlock>
      <Vote>
        <SubTitle>투표기간: 2022. 11. 29(화) - 11. 30(수)</SubTitle>
        <Candidates>
          {Bears.map((bear) => (
            <Candidate key={bear.id} isSelected>
              <CheckIcon />
              <img src={bear.img} alt={`투표 이미지 ${bear.id}`} />
              <span>{bear.title}</span>
              <DetailButton>자세히 보기</DetailButton>
            </Candidate>
          ))}
        </Candidates>
      </Vote>
      <Description>하나의 ID당 2마리의 곰 투표가 가능합니다.</Description>
      <VoteButton isDisabled>투표하기</VoteButton>
    </Container>
  );
}

export default VoteContainer;
