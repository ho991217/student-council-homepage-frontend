import axios from 'axios';
import Chevron from 'components/home/carousel/Chevron';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';

const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5px;
  overflow: hidden;
`;

const DetailWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 200px;
  padding-bottom: 20px;
  overflow: scroll;
`;

const MonthContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthDisplay = styled.div`
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.xxl};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }
  cursor: pointer;
  user-select: none;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fonts.size.lg};
    margin-bottom: 5px;
  }
`;

const P = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.media.desktop} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-bottom: 8px;
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    font-size: ${({ theme }) => theme.fonts.size.lg};
    margin-bottom: 20px;
  }
`;

const Span = styled.span``;

interface DetailProps {
  title: string;
  start: string;
  end: string;
}

function Schedule(): JSX.Element {
  const [curYear, setCurYear] = useState(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState(new Date().getMonth());
  const [curMonthDetails, setCurMonthDetails] = useState<DetailProps[]>([
    {
      start: '',
      end: '',
      title: '',
    },
  ]);

  const getMonthDetails = async (
    year: number,
    month: number,
  ): Promise<void> => {
    const dateString = month <= 9 ? `${year}0${month}` : `${year}${month}`;

    const config = {
      method: 'get',
      url: `/api/schedule?from=${dateString}01&to=${dateString}${new Date(
        curYear,
        curMonth + 1,
        0,
      ).getDate()}`,
      headers: {},
    };

    axios(config)
      .then((response) => setCurMonthDetails(response.data.data))
      .catch((error) => {
        // TODO:에러 처리
      });
  };

  useEffect(() => {
    getMonthDetails(curYear, curMonth + 1);
  }, [curYear, curMonth]);

  const handleMonthChange = (direction: string) => {
    if (direction === 'prev') {
      if (curMonth === 0) {
        setCurYear(curYear - 1);
        setCurMonth(11);
      } else {
        setCurMonth(curMonth - 1);
      }
    } else if (direction === 'cur') {
      setCurYear(new Date().getFullYear());
      setCurMonth(new Date().getMonth());
    } else if (direction === 'next') {
      if (curMonth === 11) {
        setCurYear(curYear + 1);
        setCurMonth(0);
      } else {
        setCurMonth(curMonth + 1);
      }
    }
  };

  return (
    <Container>
      <MonthContainer>
        <Chevron
          direction="left"
          onClick={() => handleMonthChange('prev')}
          color="darkgrey"
        />
        <MonthDisplay onClick={() => handleMonthChange('cur')}>
          {curYear}년 {curMonth + 1}월 학사일정
        </MonthDisplay>
        <Chevron
          direction="right"
          onClick={() => handleMonthChange('next')}
          color="darkgrey"
        />
      </MonthContainer>
      <Calendar curYear={curYear} curMonth={curMonth} />
      <DetailWrapper>
        {curMonthDetails?.map((detail) => (
          <P key={curMonthDetails.indexOf(detail)}>
            <DateContainer>
              <Span>{detail.start}</Span> ~ <Span>{detail.end}</Span>
            </DateContainer>
            <Span>{detail.title}</Span>
          </P>
        ))}
      </DetailWrapper>
    </Container>
  );
}

export default Schedule;
