export interface NavigationProps {
  title: string;
  path: string;
  id: number;
  subPath?: NavigationProps[];
}
