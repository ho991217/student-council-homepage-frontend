import { atom } from 'recoil';

export const userInfo = atom<User>({
  key: 'userInfo',
  default: {
    username: '',
    nickname: '',
    studentId: '',
    major: '',
    department: '',
    admin: false,
  },
});
