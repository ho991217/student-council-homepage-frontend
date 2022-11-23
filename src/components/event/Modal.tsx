import React from 'react';
import styled from 'styled-components';
import CloseIcon from './CloseIcon';
import { Bears } from './data';

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  mix-blend-mode: normal;
  backdrop-filter: blur(5px);
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  gap: 12px;
  position: fixed;
  padding: 30px;

  width: 80%;

  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  z-index: 20;

  img {
    width: 50%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 90%;
    padding: 30px 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 40px;
`;

const Title = styled.h1`
  font-family: 'RixDongnimGothic_Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;

  display: flex;
  align-items: center;
  text-align: left;

  color: #721b9c;
`;
const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid #721b9c;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 80%;
`;

const Team = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  span:first-child {
    font-size: 18px;
    font-weight: 700;
  }
`;
const Description = styled.p`
  line-height: 120%;
`;
const Button = styled.button`
  width: 80%;
  padding: 8px;
  background: #721b9c;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const PCImage = styled.img`
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const MobileImage = styled.img`
  ${({ theme }) => theme.media.desktop} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

const MobileContent = styled.div`
  display: flex;
  gap: 8px;
`;

interface Props {
  id: number;
  choose: (id: number) => void;
  close: () => void;
}
function Modal({ id, choose, close }: Props) {
  return (
    <div>
      <Container>
        <PCImage src={Bears[id].img} alt={`후보 이미지 ${id}`} />
        <Content>
          <div>
            <Title>{Bears[id].title}</Title>
            <Hr />
          </div>
          <MobileContent>
            <MobileImage src={Bears[id].img} alt={`후보 이미지 ${id}`} />
            <Text>
              <Team>
                <span>{Bears[id].team} 팀</span>
                <span>{`(${Bears[id].members})`}</span>
              </Team>
              <Description>{Bears[id].description}</Description>
            </Text>
          </MobileContent>

          <Button onClick={() => choose(id)}>곰 선택하기</Button>
        </Content>
        <CloseIcon close={close} />
      </Container>
      <Overlay onClick={close} />
    </div>
  );
}

export default Modal;
