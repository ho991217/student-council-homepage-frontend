import { atom } from 'recoil';

export const StudentInfoAtom = atom({
  key: 'StudentInfoAtom',
  default: {
    signupToken: '',
    student: {
      major: '',
      studentId: '',
      studentName: '',
    },
  },
});
