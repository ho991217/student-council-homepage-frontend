import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  border-left: 1px solid ${({ theme }) => theme.colors.gray200};
`;

const Div = styled.div`
  text-align: center;
  padding: 12px 5px;
  font-size: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  user-select: none;
`;

const DayDiv = styled(Div)`
  border-right: none;
  background-color: ${({ theme }) => theme.colors.blur};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  &:nth-child(1) {
    color: ${({ theme }) => theme.colors.red};
  }
  &:nth-child(7) {
    color: ${({ theme }) => theme.colors.blue};
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

const DateDiv = styled(Div)`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blur};
  }
  &:nth-child(7n + 1) {
    color: ${({ theme }) => theme.colors.red};
  }
  &:nth-child(7n + 7) {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const NextMonthDateDiv = styled(Div)`
  color: ${({ theme }) => theme.colors.gray200};
`;

// TODO: detail 내용 동적으로 바꾸기
function Schedule(): JSX.Element {
  const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];
  const dates: number[] = [];
  const nextMonthDates: number[] = [];
  const [selectDate, setSelectDate] = useState('');
  const totalCell = 35;

  // 해당 month의 마지막 날짜 구하기
  const today = new Date();
  const curYear = today.getFullYear();
  const curMonth = today.getMonth();
  const lastDate = new Date(curYear, curMonth + 1, 0).getDate();

  for (let i = 1; i < lastDate + 1; i += 1) {
    dates.push(i);
  }

  // 해당 month의 다음 month 날짜가 보이도록
  for (let i = 1; i < totalCell - lastDate + 1; i += 1) {
    nextMonthDates.push(i);
  }

  const selectDateHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    setSelectDate(target.textContent ?? '');
  };

  return (
    <Wrapper>
      {days.map((day: string) => (
        <DayDiv key={days.indexOf(day)}>{day}</DayDiv>
      ))}
      {dates.map((date: number) => (
        <DateDiv key={dates.indexOf(date)} onClick={selectDateHandler}>
          {date}
        </DateDiv>
      ))}
      {nextMonthDates.map((date: number) => (
        <NextMonthDateDiv key={nextMonthDates.indexOf(date)}>
          {date}
        </NextMonthDateDiv>
      ))}
    </Wrapper>
  );
}

export default Schedule;
