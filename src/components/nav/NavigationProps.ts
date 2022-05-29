export interface NavigationProps {
  title: string;
  path: string;
  id: string;
  subPath?: NavigationProps[];
}
