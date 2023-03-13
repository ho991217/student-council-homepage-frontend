import { atom } from 'recoil';

interface LoginStateProps {
  isLoggedIn?: boolean;
}

export const LoginStateAtom = atom<LoginStateProps>({
  key: 'loginStateAtom',
  default: {
    isLoggedIn: undefined,
  },
});
