import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-doughnut-innertext';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Context } from 'chartjs-plugin-datalabels';

const Container = styled.div`
  display: flex;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
  }
  flex-direction: row;
  justify-content: center;
  align-items: center;
  canvas {
    display: inline-block !important;
    width: 300px !important;
    height: 300px !important;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 0 20px;
  padding: 20px 80px;
  ${({ theme }) => theme.media.mobile} {
    padding: 40px 0 20px;
  }
`;
const Title = styled.h1`
  font-weight: normal;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e3e6;
  margin-bottom: 25px;
`;
const RankList = styled.ol`
  li:nth-child(1) {
    font-weight: bold;
  }
`;
const RankItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const RankNum = styled.span`
  margin-right: 10px;
`;
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
interface ChartDataProps {
  department: string;
  agreeCount: number;
  totalAgree: number;
}

export default function PetitionChart() {
  const [cookies] = useCookies(['X-AUTH-TOKEN', 'isAdmin']);
  const [searchParams] = useSearchParams();
  const [chartData, setChartData] = useState({
    department: [''],
    agreeCount: [0],
    totalAgree: 0,
  });

  const getChartData = async (postid: number) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `/post/petition/${postid}`,
        headers: {
          Authorization: `Bearer ${cookies['X-AUTH-TOKEN']}`,
        },
      });
      setChartData((prev) => ({
        ...prev,
        totalAgree: data.agreeCount,
      }));
      data.statisticList.forEach((item: ChartDataProps) =>
        setChartData((prev) => ({
          ...prev,
          department: [...prev.department, item.department],
          agreeCount: [...prev.agreeCount, item.agreeCount],
        })),
      );
      setChartData((prev) => ({
        ...prev,
        department: [
          ...prev.department.filter((item) => {
            return item !== '';
          }),
        ],
        agreeCount: [
          ...prev.agreeCount.filter((item) => {
            return item !== 0;
          }),
        ],
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const data = {
    type: 'doughnut',
    labels: chartData.department,
    datasets: [
      {
        label: '# of Votes',
        data: chartData.agreeCount,
        datalabels: {
          color: 'white',
          font: {
            size: 25,
          },
          formatter: (value: number, ctx: Context) => {
            let sum = 0;
            const dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              if (typeof data === 'number') {
                sum += data;
              }
              return sum;
            });
            const percentage = `${Math.floor((value * 100) / sum)}%`;
            return percentage;
          },
        },
        backgroundColor: [
          '#0F47F8',
          '#0D6EFA',
          '#0A95FD',
          '#08BCFF',
          '#66D5FF',
        ],
        borderColor: ['#0F47F8', '#0D6EFA', '#0A95FD', '#08BCFF', '#66D5FF'],
      },
    ],
  };

  useEffect(() => {
    const postId = Number(searchParams.get('id'));
    getChartData(postId);
  }, []);

  const chartRef = useRef<ChartJS>(null);
  const chart = chartRef.current;

  // const updateChart = () => {

  // }
  const plugins = [
    {
      id: 'centerText',
      afterDatasetsDraw: (chart: ChartJS) => {
        const { width, height, ctx, data } = chart;
        let sum = 0;
        data.datasets[0].data.forEach((item) => {
          if (typeof item === 'number') {
            sum += item;
          }
        });
        ctx.restore();
        const fontFamily = 'Lato, Helvetica Neue, Arial, sans-serif';
        ctx.font = `50px ${fontFamily}`;
        ctx.textBaseline = 'middle';
        const text1 = `${sum}`;
        const text1X = Math.round((width - ctx.measureText(text1).width) / 2);
        const text1Y = Math.round(
          (height - ctx.measureText(text1).fontBoundingBoxAscent) / 1.65,
        );
        ctx.fillText(text1, text1X, text1Y);
        ctx.font = `20px ${fontFamily}`;
        const text2 = `명`;
        const text2X = Math.round((width - ctx.measureText(text2).width) / 2);
        const text2Y = Math.round(
          (height + ctx.measureText(text2).width) / 1.65,
        );
        ctx.fillText(text2, text2X, text2Y);
        ctx.save();
      },
    },
  ];
  return (
    <Container>
      <Chart type="doughnut" data={data} plugins={plugins} ref={chartRef} />
      <TextContainer>
        <Title>
          {chartData.totalAgree === 0
            ? '아직 청원에 동의한 사람이 없습니다😢'
            : '어떤 과에서 가장 동의를 많이 했을까요?'}
        </Title>
        <RankList>
          {chartData.department.map((item, index) => (
            <RankItem key={item}>
              <div>
                <RankNum>
                  {index !== 0 &&
                  chartData.agreeCount[index] ===
                    chartData.agreeCount[index - 1]
                    ? `${index}.`
                    : `${index + 1}.`}
                </RankNum>
                {item}
              </div>
              <div>
                (
                {Math.floor(
                  (chartData.agreeCount[index] / chartData.totalAgree) * 100,
                )}
                %)
              </div>
            </RankItem>
          ))}
        </RankList>
      </TextContainer>
    </Container>
  );
}
