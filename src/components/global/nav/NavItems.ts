import { NavigationProps } from './NavigationProps';

// TODO: 각 페이지 만들어지면 경로 수정v
export const NavItems: NavigationProps[] = [
  {
    title: '총학생회 정보',
    path: '/',
    id: 1,
    subPath: [
      {
        title: '인사말',
        path: '/greeting',
        id: 1,
      },
      {
        title: '조직도',
        path: '/organization',
        id: 2,
      },
      {
        title: '오시는길',
        path: '/location',
        id: 3,
      },
      {
        title: '공약',
        path: '/pledge',
        id: 4,
      },
    ],
  },
  {
    title: '회칙',
    path: '/rules',
    id: 2,
  },
  {
    title: '회의록',
    path: '/conference',
    id: 3,
  },
  {
    title: '소통',
    path: '/',
    id: 4,
    subPath: [
      {
        title: '청원게시판',
        path: '/board-petition/boards?page=1&filter=전체',
        id: 1,
      },
      {
        title: '문의게시판',
        path: '/board-inquiry',
        id: 2,
      },
    ],
  },
];