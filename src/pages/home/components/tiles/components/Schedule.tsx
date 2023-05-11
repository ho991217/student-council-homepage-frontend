import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

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

const ReactCalendar = styled(Calendar)`
  width: 100%;

  .react-calendar__navigation {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    ${({ theme }) => theme.media.desktop} {
      font-size: ${({ theme }) => theme.fonts.size.lg};
      font-weight: ${({ theme }) => theme.fonts.weight.medium};
    }

    ${({ theme }) => theme.media.tablet} {
      font-size: ${({ theme }) => theme.fonts.size.lg};
      font-weight: ${({ theme }) => theme.fonts.weight.medium};
    }

    ${({ theme }) => theme.media.mobile} {
      font-size: ${({ theme }) => theme.fonts.size.xl};
      font-weight: ${({ theme }) => theme.fonts.weight.bold};
    }
    button {
      all: unset;
      text-align: center;
      padding: 0 10px;
      color: ${({ theme }) => theme.colors.gray900};
    }
  }
  .react-calendar__month-view__weekdays {
    background-color: rgb(242, 246, 249);
    border: 0.5px solid ${({ theme }) => theme.colors.gray300};
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    abbr {
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray900};
    }
    abbr[title='일요일'] {
      color: rgb(179, 81, 65);
    }
    abbr[title='토요일'] {
      color: rgb(0, 34, 245);
    }
  }
  .react-calendar__tile--now {
    abbr {
      color: ${({ theme }) => theme.colors.accent};
      font-weight: 700;
    }
  }
  .react-calendar__tile {
    border: 0.5px solid ${({ theme }) => theme.colors.gray300};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 0.8rem;
    height: 45px;
    cursor: pointer;
    :hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      div > div {
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${({ theme }) => theme.colors.gray500};
  }
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    div > div {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
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

const Tag = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: auto;
  margin-top: 2px;
`;

interface DetailProps {
  title: string;
  start: string;
  end: string;
}

function Schedule(): JSX.Element {
  const [curMonthDetails, setCurMonthDetails] = useState<DetailProps[]>([
    {
      start: '',
      end: '',
      title: '',
    },
  ]);

  const getMonthDetails = async (activeStartDate: Date): Promise<void> => {
    const fromDate = dayjs(activeStartDate).format('YYYY-MM-DD');
    const toDate = dayjs(activeStartDate).endOf('month').format('YYYY-MM-DD');
    const config = {
      method: 'get',
      url: `/main/schedule?from=${fromDate}&to=${toDate}`,
    };

    axios(config)
      .then(({ data }) => {
        setCurMonthDetails(data);
      })
      .catch((error) => {
        // TODO:에러 처리
      });
  };

  useEffect(() => {
    const now = new Date();
    getMonthDetails(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  return (
    <Container>
      <ReactCalendar
        maxDetail="month"
        minDetail="month"
        onActiveStartDateChange={({ activeStartDate }) =>
          getMonthDetails(activeStartDate ?? new Date())
        }
        // eslint-disable-next-line react/no-unstable-nested-components
        tileContent={({ date }) => (
          <div>
            {curMonthDetails?.find((detail) =>
              dayjs(date).isBetween(detail.start, detail.end, 'day', '[]'),
            ) && <Tag />}
          </div>
        )}
      />
      <DetailWrapper>
        {curMonthDetails?.map((detail) => (
          <P key={curMonthDetails.indexOf(detail)}>
            <DateContainer>
              <span>{detail.start}</span> ~ <span>{detail.end}</span>
            </DateContainer>
            <span>{detail.title}</span>
          </P>
        ))}
      </DetailWrapper>
    </Container>
  );
}

export default Schedule;
