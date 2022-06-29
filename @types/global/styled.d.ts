import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      blur: string;
      white: string;
      gray020: string;
      gray040: string;
      gray050: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
      red: string;
      blue: string;
    };
    fonts: {
      weight: {
        thin: number;
        light: number;
        regular: number;
        medium: number;
        bold: number;
        black: number;
      };
      size: {
        xs: string;
        sm: string;
        base: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        x3xl: string;
        x4xl: string;
        x5xl: string;
        x6xl: string;
        x7xl: string;
        x8xl: string;
        x9xl: string;
        x10xl: string;
      };
    };
    media: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
