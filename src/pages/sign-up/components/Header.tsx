import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-top: 50px;
  padding: 0 1rem;
`;

const HeaderContainer = styled.header`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: 600;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 1rem;
  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Ol = styled.ol`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.3rem 2rem;
  width: 100%;
`;

const Ellipsis = styled.div`
  display: flex;
  div {
    width: 4px;
    height: 4px;
    background-color: #cdcdcd;
    border-radius: 50%;
  }
  div + div {
    margin-left: 0.5rem;
  }
`;

const Li = styled.li<{ current: boolean }>`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ current, theme }) =>
    current ? theme.colors.gray600 : '#cdcdcd'};
  margin: 0 1rem;
  padding: 0.5rem 0;
  display: flex;
`;

const Badge = styled.div<{ current: boolean }>`
  background-color: ${({ current, theme }) =>
    current ? theme.colors.primary : '#F0F0F0'};
  color: ${({ current, theme }) => (current ? theme.colors.white : '#fff')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: 500;
  border-radius: 50%;
  margin-right: 0.6rem;
`;

const stages = [
  { id: 0, title: '이용약관 동의' },
  { id: 1, title: '학생 인증' },
  { id: 2, title: '회원 정보 입력' },
  { id: 3, title: '가입 완료' },
];

function Header() {
  const [stage, setStage] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    if (path === 'agreements') {
      setStage(0);
    } else if (path === 'verification') {
      setStage(1);
    } else if (path === 'info') {
      setStage(2);
    } else if (path === 'success') {
      setStage(3);
    } else {
      setStage(0);
    }
  }, [location.pathname]);

  return (
    <Container>
      <HeaderContainer>
        단국대학교 <em>총학생회 회원가입</em>
      </HeaderContainer>
      <Ol>
        {stages.map(({ id, title }) => (
          <>
            <Li key={id} current={id === stage}>
              <Badge current={id === stage}>0{id + 1}</Badge>
              {title}
            </Li>
            {id !== stages.length - 1 && (
              <Ellipsis>
                <div />
                <div />
                <div />
              </Ellipsis>
            )}
          </>
        ))}
      </Ol>
    </Container>
  );
}

export default Header;
