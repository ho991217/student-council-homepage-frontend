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
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  gap: 12px;
  position: fixed;
  padding: 30px;

  width: 80%;
  height: 80%;

  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  z-index: 110;

  img {
    width: 30%;
    object-fit: contain;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 90%;
    padding: 30px 20px;

    img {
      width: 80%;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 40px;

  font-size: 16px;
  line-height: 150%;
`;

const Title = styled.h1`
  font-family: rixdongnimgothic-pro;
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
  font-size: 14px;
  line-height: 130%;
  overflow-y: scroll;
`;
const Button = styled.button`
  width: 80%;
  padding: 8px;
  background: #721b9c;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  cursor: pointer;

  z-index: 300;
`;

const PCImage = styled.img`
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

const MobileImage = styled.img`
  height: 50%;
  margin: 0 auto;
  object-fit: contain;
  ${({ theme }) => theme.media.desktop} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow-y: scroll;

  z-index: 300;
`;

interface Props {
  id: number;
  isSelected: boolean;
  choose: () => void;
  close: () => void;
}
function Modal({ id, isSelected, choose, close }: Props) {
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
            <Team>
              <span>{Bears[id].team} 팀</span>
              <span>{`(${Bears[id].members})`}</span>
            </Team>
            <Description>
              {Bears[id].description.split('\n').map((value) => (
                <>
                  {value}
                  <br />
                  <br />
                </>
              ))}
            </Description>
          </MobileContent>
          <Button
            onClick={() => {
              choose();
              close();
            }}
            type="button"
          >
            {isSelected ? '선택 취소하기' : '곰 선택하기'}
          </Button>
        </Content>
        <CloseIcon close={close} />
      </Container>
      <Overlay onClick={close} />
    </div>
  );
}

export default Modal;
