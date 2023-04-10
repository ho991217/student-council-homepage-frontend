import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useToday } from 'hooks/UseToday';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogin } from 'hooks/UseLogin';
import { Container } from './components/Board.style';
import { H1, Hr, IRentalList } from './RentalLists';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  margin: 20px 0 5px 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray900};
`;

const FormContainer = styled.form`
  max-width: 1200px;
  width: 100%;
`;

const Row = styled.div<{ portion: string }>`
  display: grid;
  grid-template-columns: ${({ portion }) => portion};
  height: 60px;
  padding: 10px 0;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray020};
  label {
    border-left: 1px solid ${({ theme }) => theme.colors.gray100};
    border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  input {
    margin: 0 1em;
  }
`;

const Tile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const Label = styled.label`
  height: 100%;
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1em;
`;

const Input = styled.input`
  all: unset;
  height: 100%;
  width: 150px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 1em;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

const TextInput = styled(Input).attrs({ type: 'text' })``;

const Select = styled.select`
  height: 100%;
  flex-grow: 1;
  border-radius: 5px;
  margin: 0 1em;
  padding: 0 0.5em;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Option = styled.option``;

const DatePicker = styled(Input).attrs({ type: 'date' })`
  display: flex;
  align-items: center;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  margin: 0 1em;
  height: 10em;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  padding: 0.5em;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1em 0 5em 0;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5em 1.5em;
  :first-child {
    margin-right: 1em;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
  :last-child {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;

interface IItem {
  itemId: number;
  userClass: string;
  rentalStart: { day: string; time: string };
  rentalEnd: { day: string; time: string };
  title: string;
  body: string;
}

const parseISODate = (day: string, time: string) => {
  return `${day} ${time}:00`;
};

function RentalNew() {
  const { getUserInfo } = useLogin();
  const [userInfo, setUserInfo] = useState<User>({
    username: '',
    nickname: '',
    studentId: '',
    major: '',
    department: '',
    admin: false,
  });
  const today = useToday('yyyy-MM-dd');
  const [rentalList, setRentalList] = useState<IRentalList>([]);
  const [item, setItem] = useState<IItem>({
    itemId: 0,
    userClass: '',
    rentalStart: { day: '', time: '' },
    rentalEnd: { day: '', time: '' },
    title: '',
    body: '',
  });
  const navigate = useNavigate();

  const getRentalList = async () => {
    const { data } = await axios({
      method: 'get',
      url: '/rental/item',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setRentalList(data.content);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { itemId, userClass, rentalStart, rentalEnd, title, body } = item;

    if (
      !itemId ||
      !userClass ||
      !rentalStart.day ||
      !rentalStart.time ||
      !rentalEnd.day ||
      !rentalEnd.time ||
      !title ||
      !body
    ) {
      // eslint-disable-next-line no-alert
      alert('모든 항목을 입력해주세요.');
      return;
    }
    try {
      await axios({
        method: 'post',
        url: '/rental',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          itemId,
          userClass,
          rentalStart: parseISODate(rentalStart.day, rentalStart.time),
          rentalEnd: parseISODate(rentalEnd.day, rentalEnd.time),
          title,
          body,
        },
      });

      navigate('/rental');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRentalList();
  }, []);

  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
      setUserInfo(res);
    });
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Hr />
        <H1>대여물품 신청</H1>
      </HeaderContainer>
      <FormContainer>
        <Row portion="1fr 1fr 2fr">
          <Tile>
            <Label>신청자</Label>
            <TextInput value={userInfo.username} readOnly />
          </Tile>
          <Tile>
            <Label>학과</Label>
            <TextInput value={userInfo.major} readOnly />
          </Tile>
          <Tile>
            <Label>신청일자</Label>
            <TextInput value={today} readOnly />
          </Tile>
        </Row>
        <Row portion="1fr 1fr">
          <Tile>
            <Label>대여물품</Label>
            <Select
              defaultValue=""
              onChange={(e) => {
                if (
                  rentalList.filter((el) => el.id === Number(e.target.value))[0]
                    .remaining === 0
                ) {
                  alert('대여 가능한 물품이 없습니다.');
                  return;
                }
                setItem((prev) => ({
                  ...prev,
                  itemId: Number(e.target.value),
                }));
              }}
            >
              <Option value="">선택</Option>
              {rentalList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Tile>
          <Tile>
            <Label>대여자 구분</Label>
            <Select
              defaultValue=""
              onChange={(e) =>
                setItem((prev) => ({ ...prev, userClass: e.target.value }))
              }
            >
              <Option value="">선택</Option>
              <Option value="INDIVIDUAL">개인</Option>
              <Option value="DEPARTMENT_STUDENT_COUNCIL">단과대 학생회</Option>
              <Option value="MAJOR_STUDENT_COUNCIL">과(학부) 학생회</Option>
            </Select>
          </Tile>
        </Row>
        <Row portion="1fr">
          <Tile>
            <Label>사용기간</Label>
            <DatePicker
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  rentalStart: {
                    day: e.target.value,
                    time: prev.rentalStart.time,
                  },
                }));
              }}
            />
            <Select
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  rentalStart: {
                    day: prev.rentalStart.day,
                    time: e.target.value,
                  },
                }));
              }}
              defaultValue=""
              value={item.rentalStart.time}
            >
              <Option value="">선택</Option>
              {Array(24)
                .fill(0)
                .map((_, i) => {
                  return (
                    <>
                      <Option
                        key={Math.random()}
                        value={i < 10 ? `0${i}:00` : `${i}:00`}
                      >
                        {i < 10 ? `0${i}:00` : `${i}:00`}
                      </Option>
                      <Option
                        key={Math.random()}
                        value={i < 10 ? `0${i}:30` : `${i}:30`}
                      >
                        {i < 10 ? `0${i}:30` : `${i}:30`}
                      </Option>
                    </>
                  );
                })}
            </Select>
            ~
            <DatePicker
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  rentalEnd: {
                    day: e.target.value,
                    time: prev.rentalEnd.time,
                  },
                }));
              }}
            />
            <Select
              onChange={(e) => {
                setItem((prev) => ({
                  ...prev,
                  rentalEnd: {
                    day: prev.rentalEnd.day,
                    time: e.target.value,
                  },
                }));
              }}
              defaultValue=""
              value={item.rentalEnd.time}
            >
              <Option value="">선택</Option>
              {Array(24)
                .fill(0)
                .map((_, i) => {
                  return (
                    <>
                      <Option
                        key={Math.random()}
                        value={i < 10 ? `0${i}:00` : `${i}:00`}
                      >
                        {i < 10 ? `0${i}:00` : `${i}:00`}
                      </Option>
                      <Option
                        key={Math.random()}
                        value={i < 10 ? `0${i}:30` : `${i}:30`}
                      >
                        {i < 10 ? `0${i}:30` : `${i}:30`}
                      </Option>
                    </>
                  );
                })}
            </Select>
          </Tile>
        </Row>
        <Row portion="1fr">
          <Tile>
            <Label>행사명</Label>
            <TextInput
              style={{ flexGrow: 1 }}
              onChange={(e) =>
                setItem((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Tile>
        </Row>
        <Row portion="1fr" style={{ height: '100%' }}>
          <Tile>
            <Label>행사내용</Label>
            <TextArea
              onChange={(e) =>
                setItem((prev) => ({ ...prev, body: e.target.value }))
              }
            />
          </Tile>
        </Row>
      </FormContainer>
      <ButtonContainer>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button onClick={onSubmit}>신청</Button>
      </ButtonContainer>
    </Container>
  );
}

export default RentalNew;
