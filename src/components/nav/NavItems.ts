import { NavigationProps } from './NavigationProps';

// TODO: 각 페이지 만들어지면 경로 수정v
export const NavItems: NavigationProps[] = [

  {
    title: '총학생회',
    path: '/',
    id: 1,
    subPath: [
      {
        title: '인사말',
        path: '/greeting',
        id: 1,
      },
      {
        title: '공약',
        path: '/pledge',
        id: 2,
      },
      {
        title: '조직도',
        path: '/organization',
        id: 3,
      },
      {
        title: '오시는길',
        path: '/location',
        id: 4,
      },
    ],
  },
  {
    title: '총학소식',
    path: '/',
    id: 2,
    subPath: [
      {
        title: '총학소식',
        path: '/council-news',
        id: 1,
      },
      {
        title: '회칙',
        path: '/rules',
        id: 2,
      },
    ],
  },
  {
    title: '회의록',
    path: '/conference',
    id: 3,
  },
  {
    title: '대여물품',
    path: '/rental/lists?page=1',
    id: 4,
  },
  {
    title: '소통',
    path: '/',
    id: 5,
    subPath: [
      {
        title: '청원게시판',
        path: '/board-petition/boards?page=1',
        id: 1,
      },
      {
        title: '자유게시판',
        path: '/board-suggestion/boards?page=1',
        id: 2,
      },
    ],
  },
  {
    title: 'VOC',
    path: '/',
    id: 6,
    subPath: [
      {
        title: 'Q&A',
        path: '/voc/qna/boards?page=1',
        id: 1,
      },
      {
        title: 'My Voice',
        path: '/voc/my-voice/boards?page=1',
        id: 2,
      },
    ],
  },
];
