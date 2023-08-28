import styled from 'styled-components';
import BannerImgPC from 'static/images/global-banner/returnBusBannerPC.png';
import BannerImgMobile from 'static/images/global-banner/returnBusBannerMobile.jpg';
import axios, { AxiosError } from 'axios';
import { useLogin } from 'hooks/UseLogin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import ReturnBusTicket, { TicketInfoProps } from './ReturnBusTicket';

const Header = styled.div`
  display: flex;
  background-image: url(${BannerImgPC});
  background-position: top;
  background-repeat: no-repeat;
  background-color: #000;
  width: 100%;
  ${({ theme }) => theme.media.desktop} {
    background-size: 100% 100%;
    height: 250px;
  }
  ${({ theme }) => theme.media.tablet} {
    background-size: 100% 100%;
    height: 110px;
    margin-bottom: 10px;
  }
  ${({ theme }) => theme.media.mobile} {
    background-size: 100% 100%;
    height: 10rem;
    margin-bottom: 10px;
    background-image: url(${BannerImgMobile});
  }
  margin-bottom: 73px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  ${({ theme }) => theme.media.mobile} {
    padding: 0 10px;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  gap: 30px;
  color: #fff;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;

const Notice = styled.div`
  width: 1040px;
  height: 134px;
  background-color: #232323;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 0 10px;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: fit-content;
    padding: 10px;
    border-radius: 15px;
  }
`;

const NoticeTitle = styled.strong`
  font-size: 22px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;

const NoticeDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 10px;
  }
`;

const TicketInfo = styled.div`
  width: 353px;
  height: 134px;
  background-color: #232323;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    flex-direction: row;
    height: fit-content;
    align-items: center;
    border-radius: 15px;
  }
`;

const TicketInfoTitle = styled.strong`
  font-size: 20px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 14px;
  }
`;

const TicketInfoDesc = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const HaveTicketTitle = styled.p`
  color: #979797;
  font-size: 13px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 9px;
  }
`;

const HaveTicketDesc = styled.p<{ active?: boolean }>`
  color: ${(props) => (props.active ? '#006AFF' : '#848586')};
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
`;

const Board = styled.div`
  width: 100%;
  margin-top: 66px;
  ${({ theme }) => theme.media.mobile} {
    margin-top: 30px;
  }
`;

const BoardHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  ${({ theme }) => theme.media.mobile} {
    font-size: 11px;
  }
  padding: 0 10px;
  box-sizing: border-box;
`;

const BoardItemTitle = styled.span`
  text-align: center;
  color: #848586;
  margin-bottom: 22px;
`;

const BoardRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  border-radius: 60px;
  background: #fff;
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.05);
  text-align: center;
  padding: 20px 10px;
  font-size: 18px;
  margin-bottom: 14px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
    padding: 10px;
  }
`;

const BoardItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RegisterButton = styled.button<{ active: boolean }>`
  border-radius: 17px;
  background: ${(props) => (props.active ? '#0025ff' : '#848586')};
  pointer-events: ${({ active }) => (active ? 'default' : 'none')};
  color: #fff;
  width: 80px;
  height: 34px;
  cursor: pointer;
  border: none;
  ${({ theme }) => theme.media.mobile} {
    width: fit-content;
    height: fit-content;
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 10px;
  }
`;

const CancleButton = styled(RegisterButton)<{ active: boolean }>`
  border-radius: 17px;
  background: ${(props) => (props.active ? '#0025ff' : '#848586')};
  color: #fff;
  width: 80px;
  height: 34px;
  cursor: ${(props) => (props.active ? 'cursor' : 'default')};
  border: none;
  ${({ theme }) => theme.media.mobile} {
    width: fit-content;
    height: fit-content;
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 10px;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;
const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
  width: 50%;
  max-width: 1200px;
  gap: 15px;
  border: none;
  box-shadow: 0px 4px 5px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  background-color: #fff;
  ${({ theme }) => theme.media.mobile} {
    width: 95%;
  }
`;
const ModalNoticeTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 25px;
  ${({ theme }) => theme.media.mobile} {
    font-size: 18px;
  }
`;
const ModalNoticeContent = styled.div`
  overflow-y: auto;
  
  list-style: outside;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
  strong {
    color: red;
  }
  p {
    line-height: 1.5;
  }
  margin-bottom: 20px;
  ${({theme})=>theme.media.mobile} {
    max-height: 200px;
  }
`;
const ModalNoticeRadioLabel = styled.label<{ animation: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => !props.animation && 'animation: vertical-shaking 0.5s 1;'}
  @keyframes vertical-shaking {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(1px);
    }
    50% {
      transform: translateY(-1px);
    }
    75% {
      transform: translateY(1px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const ModalNoticeRadioButton = styled.input.attrs({ type: 'radio' })``;
const ModalButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const ModalCancleButton = styled.button`
  border-radius: 40px;
  background-color: #cfcfcf;
  padding: 5px 25px;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
    padding: 5px 15px;
  }
`;
const ModalConfirmButton = styled(ModalCancleButton)`
  background-color: #0025ff;
  color: #fff;
`;
const CancleInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
  margin-top: 20px;
`;
const CancleTextInput = styled.input`
  width: 300px;
  border-radius: 40px;
  border: 1px solid #c9c9c9;
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  font-family: inherit;
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    color: #000;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
  &:focus {
    outline: 0;
  }
`;
const CancleTimeFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;
const CancleTimeInput = styled(CancleTextInput)`
  width: 49%;
  padding: 10px;
  font-family: inherit;
  color: #000;
`;
const ErrorMsg = styled.p`
  color: red;
`;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
  },
  content: {
    maxWidth: '850px',
    width: '80vw',
    height: 'fit-content',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    border: 'none',
    boxShadow: '0px 4px 5px 2px rgba(0, 0, 0, 0.05)',
    padding: '0',
    borderRadius: 'none',
    backgroundColor: 'transparent',
  },
};
interface BusInfoProps {
  destination: string;
  id: number;
  label: string;
  path: string[];
  remainingSeats: number;
  status: string;
  totalSeats: number;
}

export default function ReturnBus() {
  const { getAccessToken } = useLogin();
  const [registerStatus, setRegisterStatus] = useState('NONE');
  const [busInfo, setBusInfo] = useState<BusInfoProps[]>([]);
  const [showTicket, setShowTicket] = useState(false);
  const [userTicketInfo, setUserTicketInfo] = useState<TicketInfoProps>({
    hasTicket: false,
    destination: '',
    id: 0,
    label: '',
    path: [''],
  });
  const [animation, setAnimation] = useState<boolean>(false);
  const [userCancleTicketInfo, setUserCancleTicketInfo] = useState({
    depositor: '',
    accountNum: '',
    bankName: '',
  });
  const [error, setError] = useState(false);
  const [cancleTicketInfo, setCancleTicketInfo] = useState({
    try: false,
    busId: 0,
    success: false,
    fail: false,
    agreement: false,
  });
  const [registerTicketInfo, setRegisterTicketInfo] = useState({
    try: false,
    busId: 0,
    success: false,
    fail: false,
    agreement: false,
    error: {
      isError: false,
      message: '',
    },
  });
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    content: <div />,
    open: false,
  });

  const getBusInfo = async () => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/homebus`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log(data);
      setBusInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBusInfo([]);
  }, [getAccessToken()]);
  useEffect(() => {
    getBusInfo();
  }, []);

  useEffect(() => {
    busInfo.forEach((item) => {
      if (item.status !== 'NONE') {
        setRegisterStatus(item.status);
      }

      if (item.status === 'ISSUED' || item.status === 'NEED_CANCEL_APPROVAL') {
        setUserTicketInfo({
          hasTicket: true,
          destination: item.destination,
          id: item.id,
          path: item.path,
          label: item.label,
        });
      }
    });
  }, [busInfo]);

  const handleModalState = (state: boolean) => {
    setModalState((prev) => !prev);
    if (state) {
      setAnimation(false);
    }
  };

  const postTicket = async (busId: number) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: `/homebus/ticket/${busId}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setRegisterTicketInfo({
        try: false,
        busId: 0,
        success: true,
        fail: false,
        agreement: false,
        error: { isError: false, message: '' },
      });
      getBusInfo();
    } catch (error) {
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      setRegisterTicketInfo((prev) => {
        return {
          ...prev,
          try: false,
          fail: true,
          error: { isError: true, message: errorResponse!.data?.message },
        };
      });
    }
  };

  const cancleTicket = async (busId: number) => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `/homebus/ticket/${busId}`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        data: userCancleTicketInfo,
      });
      setCancleTicketInfo((prev) => {
        return { ...prev, try: false, success: true };
      });
      getBusInfo();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRegisterTicket = () => {
    if (registerTicketInfo.agreement) {
      postTicket(registerTicketInfo.busId);
    } else {
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 0);
    }
  };

  const handleCancleTicket = () => {
    if (
      userCancleTicketInfo.depositor.length > 0 &&
      userCancleTicketInfo.bankName.length > 0 &&
      userCancleTicketInfo.accountNum.length > 0
    ) {
      setError(false);
      if (cancleTicketInfo.agreement) {
        cancleTicket(cancleTicketInfo.busId);
      } else {
        setAnimation(true);
        setTimeout(() => {
          setAnimation(false);
        }, 0);
      }
    } else {
      setError(true);
    }
  };

  const handleShowTicket = () => {
    setModalOpen({
      open: true,
      content: <ReturnBusTicket ticketInfo={userTicketInfo} />,
    });
  };

  useEffect(() => {
    console.log(registerStatus)
    console.log(registerStatus === "NEED_APPROVAL" || registerStatus === "NONE");
  }, [registerStatus]);

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <InfoContainer>
            <Notice>
              <NoticeTitle>
                모든 버스는 단국대학교 곰상에서 2023/12/32 12:00 에 출발합니다.
              </NoticeTitle>
              <NoticeDesc>
                <p>· 계좌에 보증급 입금이 완료되어야 승차권 확정이 됩니다.</p>
                <p>
                  · 승차권은 월요일, 수요일, 금요일 18시(오후 6시)에 입금여부를
                  확인하여 업데이트 됩니다.
                </p>
              </NoticeDesc>
            </Notice>
            <TicketInfo>
              <TicketInfoTitle>귀향버스 티켓 시스템</TicketInfoTitle>
              <TicketInfoDesc>
                {getAccessToken() === null ? (
                  <HaveTicketDesc>로그인 후 이용 가능</HaveTicketDesc>
                ) : (
                  <>
                    <HaveTicketTitle>승차권 유무</HaveTicketTitle>
                    {userTicketInfo.hasTicket ? (
                      <HaveTicketDesc
                        active
                        onClick={() => {
                          handleShowTicket();
                        }}
                      >
                        승차권이 있습니다.
                      </HaveTicketDesc>
                    ) : (
                      <HaveTicketDesc>승차권이 없습니다.</HaveTicketDesc>
                    )}
                  </>
                )}
              </TicketInfoDesc>
            </TicketInfo>
          </InfoContainer>
          <Board>
            <BoardHeader>
              <BoardItemTitle>호차</BoardItemTitle>
              <BoardItemTitle>경로</BoardItemTitle>
              <BoardItemTitle>종착지</BoardItemTitle>
              <BoardItemTitle>잔여석</BoardItemTitle>
              <BoardItemTitle> </BoardItemTitle>
            </BoardHeader>
            {busInfo.map((item) => {
              return (
                <BoardRow key={item.id}>
                  <BoardItem>{item.label}</BoardItem>
                  <BoardItem>
                    {item.path[0]}
                    {item.path.slice(1).map((pathItem) => {
                      return <span key={pathItem}>-&gt; {pathItem}</span>;
                    })}
                  </BoardItem>
                  <BoardItem>{item.destination}</BoardItem>
                  <BoardItem>
                    {item.remainingSeats}/{item.totalSeats}
                  </BoardItem>
                  <BoardItem>
                    {item.status === 'NEED_APPROVAL' ||
                    item.status === 'NEED_CANCEL_APPROVAL' ||
                    item.status === 'ISSUED' ? (
                      <CancleButton
                        active={
                          item.status === 'ISSUED'
                        }
                        onClick={() => {
                          if (
                            item.status === 'ISSUED'
                          ) {
                            handleModalState(true);
                            setCancleTicketInfo((prev) => {
                              return { ...prev, try: true, busId: item.id };
                            });
                            setUserCancleTicketInfo({
                              depositor: '',
                              bankName: '',
                              accountNum: '',
                            });
                          }
                          setError(false);
                        }}
                      >
                        {
                          (function(){
                            let text = ""
                            if (item.status === 'NEED_CANCEL_APPROVAL') text = "취소 대기"
                            else if (item.status === 'NEED_APPROVAL') text = "처리 중"
                            else text = "취소"
                            return text
                          })()
                          }
                      </CancleButton>
                    ) : (
                      <RegisterButton
                        active={
                          registerStatus === "NONE" || registerStatus === "CANCELLED"
                        }
                        onClick={() => {
                          handleModalState(true);
                          if (item.remainingSeats !== 0) {
                            setRegisterTicketInfo({
                              try: true,
                              busId: item.id,
                              success: false,
                              fail: false,
                              agreement: false,
                              error: { isError: false, message: '' },
                            });
                          } else {
                            setRegisterTicketInfo((prev) => {
                              return {
                                ...prev,
                                try: false,
                                success: false,
                                fail: true,
                              };
                            });
                          }
                        }}
                      >
                        신청
                      </RegisterButton>
                    )}
                  </BoardItem>
                </BoardRow>
              );
            })}
          </Board>
        </Container>
      </Wrapper>
      {modalState && (
        <Overlay>
          <ModalContainer>
            {cancleTicketInfo.try && (
              <>
                <ModalNoticeTitle>승차권 취소 시 유의사항</ModalNoticeTitle>
                <ModalNoticeContent>
                  <p>
                    ㆍ 예금주 명과 계좌번호를 정확하게 기입해 주시기 바랍니다.
                  </p>
                  <p>
                    ㆍ 승차권 취소 완료는 월, 수, 금 18시에 일괄적으로
                    진행됩니다.
                  </p>
                  <p>
                    ㆍ 승차권 취소 완료가 된 이후에 신규 신청을 진행할 수
                    있습니다.
                  </p>
                  <CancleInfoForm>
                    {error && <ErrorMsg>모두 입력해주세요</ErrorMsg>}
                    <CancleTextInput
                      type="text"
                      placeholder="예금주명 입력"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserCancleTicketInfo((prev) => {
                          return { ...prev, depositor: e.target.value };
                        });
                      }}
                    />
                    <CancleTextInput
                      type="text"
                      placeholder="은행명 입력"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserCancleTicketInfo((prev) => {
                          return { ...prev, bankName: e.target.value };
                        });
                      }}
                    />
                    <CancleTimeFlexBox>
                      <CancleTimeInput
                        type="date"
                        placeholder="입금 날짜 선택"
                      />
                      <CancleTimeInput
                        type="time"
                        placeholder="입금 날짜 선택"
                      />
                    </CancleTimeFlexBox>
                    <CancleTextInput
                      type="number"
                      placeholder="입금 받을 계좌 번호 입력"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserCancleTicketInfo((prev) => {
                          return {
                            ...prev,
                            accountNum: String(e.target.value),
                          };
                        });
                      }}
                    />
                  </CancleInfoForm>
                </ModalNoticeContent>
                <ModalNoticeRadioLabel animation={animation}>
                  <ModalNoticeRadioButton
                    onClick={() => {
                      setCancleTicketInfo((prev) => {
                        return { ...prev, agreement: true };
                      });
                    }}
                  />
                  위 안내사항들을 모두 숙지하였습니다.
                </ModalNoticeRadioLabel>
                <ModalButtonContainer>
                  <ModalCancleButton
                    onClick={() => {
                      handleModalState(false);
                      setCancleTicketInfo((prev) => {
                        return { ...prev, try: false, agreement: false };
                      });
                    }}
                  >
                    취소
                  </ModalCancleButton>
                  <ModalConfirmButton
                    onClick={() => {
                      handleCancleTicket();
                    }}
                  >
                    확인
                  </ModalConfirmButton>
                </ModalButtonContainer>
              </>
            )}
            {cancleTicketInfo.success && (
              <>
                <ModalNoticeTitle>
                  승차권 취소 신청이 완료되었습니다
                </ModalNoticeTitle>
                <ModalNoticeContent>
                  <p>
                    ㆍ 승차권 취소 완료는 월요일, 수요일, 금요일 18시에
                    일괄적으로 진행됩니다.
                  </p>
                  <p>
                    ㆍ 기입된 예금주 명과 계좌번호가 일치하지 않을 경우 개별적인
                    연락이 갈 수 있습니다.
                  </p>
                  <p>
                    ㆍ 기존 신청 노선의 취소가 완료 된 이후에 신규 노선 신청이
                    가능합니다.
                  </p>
                </ModalNoticeContent>
                <ModalButtonContainer>
                  <ModalConfirmButton
                    onClick={() => {
                      handleModalState(false);
                      setCancleTicketInfo((prev) => {
                        return {
                          ...prev,
                          success: false,
                          try: false,
                        };
                      });
                    }}
                  >
                    확인
                  </ModalConfirmButton>
                </ModalButtonContainer>
              </>
            )}
            {registerTicketInfo.try && (
              <>
                <ModalNoticeTitle>승차권 신청 시 유의사항</ModalNoticeTitle>
                <ModalNoticeContent>
                  <p>
                    ㆍ 신청 이후 취소 보증금(10,000원)을{' '}
                    <strong>꼭 본인의 명의</strong>로 명시된 계좌에 입금
                    부탁드립니다.
                  </p>
                  <p>ㆍ 보증금은 버스 탑승 및 출발시 현금으로 지급 됩니다.</p>
                  <p>
                    ㆍ 본인명의로 입금하지 않은 경우 신청완료가 지연될 수
                    있습니다.
                  </p>
                  <p>
                    ㆍ x월xx일 xx시 이후로는 취소가 불가능합니다. 일정
                    참고해주시기 바랍니다.
                  </p>
                  <p>
                    ㆍ x월 x일(신청 마감일) 이후 취소자는 유고결석 인정기준에
                    준하는 사유가 없을 시 보증금을 환급받으실 수 없습니다.
                  </p>
                  <br/>
                  <p>[단국대학교 총학생회 홈페이지] 개인정보 제 3자 제공 동의서</p>
                  <p>[단국대학교 총학생회 홈페이지] 제공받는 자: 단국대학교 학생팀 학생처</p>
                  <p>[단국대학교 총학생회 홈페이지] 이름, 학번, 학과, 휴대전화번호 제 3자 제공 동의</p>
                  <p>[단국대학교 총학생회 홈페이지] 관리부서: 단국대학교 총학생회, 단국대학교 학생팀 학생처</p>
                  <p>[단국대학교 총학생회 홈페이지] 관련법규: 개인정보 보호법 제 15조, 제 22조, 제 24조</p>
                  <p>[단국대학교 총학생회 홈페이지] 활용기간 및 보유기간: 귀향버스 운행기간(제출일로부터 1개월 보관)</p>
                  <p>[단국대학교 총학생회 홈페이지] 제 3자 제공의 목적: 탑승자 여행자보험 가입을 위한 단국대학교 학생팀에 제공</p>     
                  <br/>
                  <p>[단국대학교] 개인정보 수집 및 활용 동의서(주체: 단국대학교)</p>
                  <p>[단국대학교] 이름, 주민번호 수집 및 활용 동의</p>
                  <p>[단국대학교] 관리부서: 단국대학교 총학생회, 단국대학교 학생팀 학생처</p>
                  <p>[단국대학교] 관련법규: 개인정보 보호법 제 15조, 제 22조, 제 24조</p>
                  <p>[단국대학교] 활용기간 및 보유기간: 귀향버스 운행기간(제출일로부터 1개월 보관)</p>
                  <p>[단국대학교] 수집 및 활용의 목적: 탑승자 여행자보험 가입에 활용</p>                  
                </ModalNoticeContent>
                <ModalNoticeRadioLabel animation={animation}>
                  <ModalNoticeRadioButton
                    onClick={() => {
                      setRegisterTicketInfo((prev) => {
                        return { ...prev, agreement: true };
                      });
                    }}
                  />
                  위 안내사항들을 모두 숙지하였습니다.
                </ModalNoticeRadioLabel>
                <ModalButtonContainer>
                  <ModalCancleButton
                    onClick={() => {
                      handleModalState(false);
                      setRegisterTicketInfo((prev) => {
                        return {
                          ...prev,
                          try: false,
                          agreement: false,
                        };
                      });
                    }}
                  >
                    취소
                  </ModalCancleButton>
                  <ModalConfirmButton
                    onClick={() => {
                      handleRegisterTicket();
                    }}
                  >
                    확인
                  </ModalConfirmButton>
                </ModalButtonContainer>
              </>
            )}

            <>
              {registerTicketInfo.success && (
                <>
                  <ModalNoticeTitle>
                    승차권 신청이 완료되었습니다
                  </ModalNoticeTitle>
                  <ModalNoticeContent>
                    <p>
                      <strong>입금이 확인되어야 신청이 완료됩니다.</strong>
                    </p>
                    <p>
                      ㆍ 신청 후 발신되는 메시지에 명시된 계좌로 입금
                      부탁드립니다.
                    </p>
                    <p>
                      ㆍ 탑승 시 배부된 온라인 승차권을 보여주시기 바랍니다.
                    </p>
                    <p>
                      ㆍ 신청 메시지를 수신하지 못하신 경우 담다 소통창구를 통해
                      연락 부탁드립니다.
                    </p>
                  </ModalNoticeContent>
                  <ModalButtonContainer>
                    <ModalConfirmButton
                      onClick={() => {
                        setModalState(false);
                        setRegisterTicketInfo((prev) => {
                          return {
                            ...prev,
                            success: false,
                            busId: 0,
                          };
                        });
                      }}
                    >
                      확인
                    </ModalConfirmButton>
                  </ModalButtonContainer>
                </>
              )}

              {registerTicketInfo.fail && (
                <>
                  <ModalNoticeTitle>신청에 실패하였습니다.</ModalNoticeTitle>
                  <ModalNoticeContent>
                    {registerTicketInfo.error.isError ? (
                      registerTicketInfo.error.message
                    ) : (
                      <>
                        신청에 실패하였습니다.
                        <p>ㆍ 노선의 공석 확인 후 신청 부탁드리겠습니다.</p>
                        <p>
                          ㆍ 이외의 문제가 생겼다면 담다 소통창구로 연락
                          부탁드립니다.
                        </p>
                      </>
                    )}
                  </ModalNoticeContent>
                  <ModalButtonContainer>
                    <ModalConfirmButton
                      onClick={() => {
                        setModalState(false);
                        setRegisterTicketInfo({
                          try: false,
                          busId: 0,
                          success: false,
                          fail: false,
                          agreement: false,
                          error: { isError: false, message: '' },
                        });
                      }}
                    >
                      확인
                    </ModalConfirmButton>
                  </ModalButtonContainer>
                </>
              )}
            </>
          </ModalContainer>
        </Overlay>
      )}
      <ReactModal
        isOpen={modalOpen.open}
        contentLabel="Example Modal"
        style={modalStyle}
        ariaHideApp={false}
        onRequestClose={() =>
          setModalOpen((prev) => ({ ...prev, open: false }))
        }
        shouldCloseOnOverlayClick
      >
        {modalOpen.content}
      </ReactModal>
    </>
  );
}
