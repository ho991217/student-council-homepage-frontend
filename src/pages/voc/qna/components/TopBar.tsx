import styled from 'styled-components';

const InfoBox = styled.div`
  max-width: 1290px;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    padding: 20px 50px 20px 50px;
  }
  ${({ theme }) => theme.media.tablet} {
    padding: 10px 50px 10px 50px;
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 10px 10px 20px 10px;
  }
  background-color: #f9f9f9;
  padding: 0 58px;
  border-radius: 10px;
  margin-bottom: 28px;
`;

const PHead = styled.div`
  width: 42px;
  border-top: 4px solid #1d64aa;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  padding-top: 4px;
`;

const PDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  gap: 10px;
  margin: 11px 0;
`;

function TopBar() {
  return (
    <InfoBox>
      <PHead>Q&A</PHead>
      <PDiv>
        <p>욕설 및 인신공격성 글은 운영원칙에 따라 삭제합니다.</p>
        <p>
          등재된 글은 원칙적으로 삭제할 수 없음에 유념하여 작성하여 주시기
          바랍니다.
        </p>
        <p>
          작성된 내용 중 개인정보는{' '}
          <span style={{ color: 'red' }}>블라인드(*)</span>로 처리됩니다.
        </p>
      </PDiv>
    </InfoBox>
  );
}

export default TopBar;
