import axios from 'axios';
import { useLogin } from 'hooks/UseLogin';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TicketContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;
const TicketNotice = styled.div`
  width: 100%;
  background-color: #0025ff;
  padding: 5px;
  color: rgba(255, 255, 255, 0.6);
  font-size: ${({ theme }) => theme.fonts.size.sm};
  padding: 2px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
`;
const TicketNoticeText = styled.p`
  animation: moving 60s infinite linear;
  position: relative;
  margin-right: 3px;

  @keyframes moving {
    from   { transform: translateX(0%); }
  to { transform: translateX(-50%); }
  }

`;
const TicketHeader = styled.div`
  width: 100%;
  background: linear-gradient(360deg, #0025ff 0%, #000 100%);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 0;
  color: #fff;
  gap: 30px;
`;
const TicketTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.x3xl};
`;
const TicketRow = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.base};
  display: flex;
  gap: 30px;
  align-items: center;
`;
const TicketBusNumber = styled.span``;
const TicketPlace = styled.span`
  width: 120px;
  text-align: center;
  ${({ theme }) => theme.media.mobile} {
    width: 100px;
  }
`;
const TicketPathGrid = styled.div<{ row: number }>`
  display: grid;
  justify-content: center;
  text-align: center;
  grid-template-columns: repeat(${(props) => props.row}, 1fr);
  padding: 40px 0 30px 0;
  row-gap: 10px;
  width: 400px;
  ${({ theme }) => theme.media.mobile} {
    width: 70vw;
  }
`;
const TicketDesc = styled.div`
  border-top: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 10px;
  width: 100%;
  line-height: 1.5;
`;
const TicketDescTitle = styled.h1`
  color: #848586;
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;

const TicketFooter = styled(TicketNotice)`
  text-align: center;
  display: flex;
  justify-content: center;
`;

export interface TicketInfoProps {
  hasTicket: boolean;
  destination: string;
  id: number;
  label: string;
  path: string[];
}

interface UserProps {
  studentId: string;
  username: string;
  nickname: string;
  yearOfAdmission: string;
  major: string;
  department: string;
  phoneNumber: string;
  writePostCount: number;
  commentedPostCount: number;
  likedPostCount: number;
  admin: boolean;
}

export default function ReturnBusTicket({
  ticketInfo,
}: {
  ticketInfo: TicketInfoProps;
}) {
  const { getAccessToken } = useLogin();
  const [userInfo, setUserInfo] = useState<UserProps>();

  const getUserInfo = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/user`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <TicketContainer>
      <TicketNotice>
        <TicketNoticeText>
          위변조 방지 중입니다. 보안 정책에 따라 화면을 캡쳐하실 수 없습니다.
          위변조 방지 중입니다. 보안 정책에 따라 화면을 캡쳐하실 수 없습니다.
          위변조 방지 중입니다. 보안 정책에 따라 화면을 캡쳐하실 수 없습니다.
          위변조 방지 중입니다. 보안 정책에 따라 화면을 캡쳐하실 수 없습니다.
          위변조 방지 중입니다. 보안 정책에 따라 화면을 캡쳐하실 수 없습니다.
        </TicketNoticeText>
      </TicketNotice>
      <TicketHeader>
        <TicketTitle>TICKET</TicketTitle>
        <TicketRow>
          <TicketBusNumber>{ticketInfo.label}</TicketBusNumber>
          <TicketBusNumber>{`${userInfo?.username} (${userInfo?.studentId.slice(
            0,
            4,
          )}****)`}</TicketBusNumber>
        </TicketRow>
        <TicketRow>
          <TicketPlace>단국대</TicketPlace>
          <svg
            width="24"
            height="4"
            viewBox="0 0 24 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" fill="white" />
            <circle cx="12" cy="2" r="2" fill="white" />
            <circle cx="22" cy="2" r="2" fill="white" />
          </svg>
          <TicketPlace>
            {ticketInfo.destination}
          </TicketPlace>
        </TicketRow>
      </TicketHeader>
      <TicketPathGrid row={ticketInfo.path ? ticketInfo.path.length + 2 : 2}>
        <strong>출발</strong>
        {ticketInfo.path.map((_, index) => {
          if (ticketInfo.path.length > 0) {
            return <strong>경유</strong>;
          }
          return null;
        })}
        <strong>도착</strong>
        <span key='departure'>단국대</span>
        {ticketInfo.path.map((item) => {
          return <span key={item}>{item}</span>;
        })}
        <span key='destination'>{ticketInfo.destination}</span>
      </TicketPathGrid>
      <TicketDesc>
        <TicketDescTitle>주의사항</TicketDescTitle>
        <ul>
          <li>ㆍ 본 티켓은 양도 및 판매가 불가합니다.</li>
          <li>ㆍ 캡쳐된 티켓은 사용하실 수 없습니다.</li>
          <li>ㆍ 본 티켓은 문자 수신이 가능한 단말에 포함되어야 합니다.</li>
          <li>ㆍ 승차 시 본 티켓을 제시해주세요.</li>
          <li>ㆍ 상기 내용 불이행 시 불이익이 있을 수 있습니다.</li>
        </ul>
      </TicketDesc>
      <TicketFooter>귀향버스 티켓</TicketFooter>
    </TicketContainer>
  );
}
