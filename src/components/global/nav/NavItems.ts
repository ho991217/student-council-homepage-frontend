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
        path: '/hello',
        id: 1,
      },
      {
        title: '조직도',
        path: '/organization',
        id: 2,
      },
      {
        title: '오시는길',
        path: '/',
        id: 3,
      },
    ],
  },
  {
    title: '회칙',
    path: '/',
    id: 2,
  },
  {
    title: '회의록',
    path: '/',
    id: 3,
  },
  {
    title: '소통',
    path: '/',
    id: 4,
    subPath: [
      {
        title: '청원게시판',
        path: '/',
        id: 1,
      },
      {
        title: '문의게시판',
        path: '/',
        id: 2,
      },
    ],
  },
];
