import { atom } from 'recoil';

interface LoginStateProps {
  isLoggedIn?: boolean;
  admin?: boolean;
}

export const LoginStateAtom = atom<LoginStateProps>({
  key: 'loginStateAtom',
  default: {
    isLoggedIn: true,
    admin: undefined,
  },
});
