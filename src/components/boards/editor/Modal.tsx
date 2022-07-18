import styled, { css } from "styled-components";


interface propTypes {
  onCloseModalHandler: () => void;
  onSubmitHandler: () => void;
}

const Container = styled.div`
  width: 880px;
  height: 680px;
  ${({ theme }) => theme.media.tablet} { 
    width: 590px; 
    height: 520px;
   }
  ${({ theme }) => theme.media.mobile} { 
    width: 300px; 
    height: 500px;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.darkblue }};
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  text-align: center;
  padding: 20px 0;
  user-select: none;
`;

const SubTitle = styled.div`
  text-align: center;
  padding: 20px 0;
  user-select: none;
  font-size: ${({ theme }) => theme.fonts.size.base};
  ${({ theme }) => theme.media.mobile} { 
    line-height: ${({ theme }) => theme.fonts.size.xl};
    padding: 8px 35px;
  }
`;

const Detail = styled.textarea`
  width: 760px;
  height: 460px;
  resize: none;
  padding: 20px 20px;
  :focus { outline: none; }
  display: block;
  margin: 0 auto;
  white-space: pre-line;
  background-color: ${({ theme }) => theme.colors.gray050 }};
  color: ${({ theme }) => theme.colors.gray200 }};
  font-size: ${({ theme }) => theme.fonts.size.base};
  line-height: ${({ theme }) => theme.fonts.size.xl};
  ${({ theme }) => theme.media.tablet} { 
    width: 510px; 
    height: 300px;
  }
  ${({ theme }) => theme.media.mobile} { 
    width: 280px;
    height: 290px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ${({ theme }) => theme.media.mobile} { margin: 15px 0; }
`;

const ButtonDefault = css`
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.darkblue }};
  color: ${({ theme }) => theme.colors.white }};
  font-size: ${({ theme }) => theme.fonts.size.base};
`;

const AgreeButton = styled.button`
  ${ButtonDefault}
  width: 300px;
  margin-right: 10px;
  ${({ theme }) => theme.media.mobile} { width: 130px;}
`;

const CancelButton = styled.button`
  ${ButtonDefault}
  width: 150px;
  ${({ theme }) => theme.media.mobile} { width: 80px;}
`;

function Modal({ onCloseModalHandler, onSubmitHandler }: propTypes): JSX.Element {
  const placeholder = `1. 개인정보 수집목적 및 이용목적

  (1) 홈페이지 회원 가입 및 관리
  회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등의 목적
  
  (2) 재화 또는 서비스 제공
  물품 배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등의 목적
  
  (3) 고충 처리
  민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등
  
  2. 수집하는 개인정보 항목
  ID, 성명, 비밀번호, 주소, 휴대폰 번호, 이메일, 14세 미만 가입자의 경우 법정대리인 정보
  `;

  return (
    <Container>
      <Title>개인정보 수집 및 이용 동의</Title>
      <SubTitle>청원 게시글을 올리기 전에 약관을 반드시 읽고, 약관에 동의해주세요!</SubTitle>
      <Detail 
        readOnly
        placeholder={placeholder}
      />
      <Buttons>
        <AgreeButton type="button" onClick={onSubmitHandler}>약관에 동의합니다.</AgreeButton>
        <CancelButton type="button" onClick={onCloseModalHandler}>취소</CancelButton>
      </Buttons>
    </Container>
  )
}

export default Modal;