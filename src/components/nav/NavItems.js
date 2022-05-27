// TODO: 각 페이지 만들어지면 경로 수정v
// TODO: NavItem과 MenuItem으로 분리하기보다
// 한 파일 안에서 subPath로 관리하는게 용이할 것 같습니다.
/* 
  export const navItems = [
    {
      title: '총학생회 정보',
      path: '/info',
      id: 1,
      subPath: [
          {
            title: '인사말',
            path: '/hello',
            id: 11
          },
          {
            title: '조직도',
            path: '/hierarchy',
            id: 12
          },
          ...
      ]
    },
    ...
  ]
*/
// TODO: 다른 navigation 메뉴들도 추가 해 주세요.

export const NavItems = [
  {
    title: '총학생회 정보',
    path: '/',
    id: 1,
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
  },
];
