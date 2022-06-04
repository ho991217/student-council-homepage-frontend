import Board from 'components/boards/Board';
import PageControl from 'components/boards/PageControl';
import { Post } from 'components/boards/PostProps';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const dummyBoard = [
  {
    id: 1,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 15,
    tag: '학교생활',
    comments: 7,
  },
  {
    id: 2,
    header: '답변완료',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 8,
    tag: '교내시설',
    comments: 5,
  },
  {
    id: 3,
    header: '답변완료',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 10,
    tag: '코로나19',
    comments: 10,
  },
  {
    id: 4,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    date: '2020-01-01',
    like: 15,
    tag: '코로나19',
    comments: 7,
  },
  {
    id: 5,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    date: '2020-01-01',
    like: 22,
    tag: '장학금',
    comments: 4,
  },
  {
    id: 6,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 22,
    tag: '학교생활',
    comments: 40,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '수업',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '기타',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '기타',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '기타',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '학교생활',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다.',
    writer: '총학생회',
    like: 2,
    tag: '장학금',
    comments: 150,
  },
  {
    id: 7,
    header: '진행중',
    title: '청원게시판 테스트입니다. (기타)',
    writer: '총학생회',
    like: 2,
    tag: '기타',
    comments: 150,
  },
];

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
`;

function PetitionBoard(): JSX.Element {
  const [board, setBoard] = useState<Post[]>([]);
  const [boardsCount, setBoardsCount] = useState<number>(0);
  const [curFilter, setCurFilter] = useState<string>('all');
  const { page, filter } = useParams();

  useEffect(() => {
    setBoard(dummyBoard);
    setBoardsCount(dummyBoard.length);
    setCurFilter(filter === undefined ? 'all' : filter);
  }, [dummyBoard, filter]);

  return (
    <Container>
      <Board posts={board} filter={curFilter} currentPage={Number(page)} />
      <PageControl
        postCount={boardsCount}
        filter={curFilter}
        currentPage={Number(page)}
      />
    </Container>
  );
}

export default PetitionBoard;
