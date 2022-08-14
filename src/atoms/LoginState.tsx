import { atom } from 'recoil';

export const LoginStateAtom = atom<boolean>({
  key: 'loginStateAtom',
  default: false,
});
