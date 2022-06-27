import { useMediaQuery } from 'react-responsive';

interface MediaProps {
  children: JSX.Element;
}

export function Desktop({ children }: MediaProps): JSX.Element | null {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
}

export function Tablet({ children }: MediaProps): JSX.Element | null {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
}

export function Mobile({ children }: MediaProps): JSX.Element | null {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
}