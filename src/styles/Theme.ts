// 색상 등 테마 작성하는 파일
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#9B88BF',
    secondary: '#9753DC',
    accent: '#79C0D5',
    white: '#FFFFFF',
    gray020: '#F9F9F9',
    gray040: '#F2F3F5',
    gray050: '#EBEDF0',
    gray100: '#E1E3E6',
    gray200: '#C4C8CC',
    gray300: '#AAAEB3',
    gray400: '#909499',
    gray500: '#76787A',
    gray600: '#5D5F61',
    gray700: '#454647',
    gray800: '#2C2D2E',
    gray900: '#19191A',
  },
  fonts: {
    smallTitle: 'font-size: 18px; font-weight: 600;',
    smallSubTitle: 'font-size: 14px; font-weight: 500;',
    smallDescription: 'font-size: 11px; font-weight: 400;',
  },
  media: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (max-width: 1024px)',
    desktop: '@media (min-width: 1024px)',
  },
};
