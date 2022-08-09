export interface ImageProps {
  url: string;
  id: string;
  title: string;
  alt: string;
}

export interface SlideProps {
  url: string;
  index: number;
  cur: number;
  size: number;
  alt?: string;
}

export interface ChevronProps {
  direction: string;
  onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  color?: string;
}

export interface ToggleAutoSlideProps {
  onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  autoInterval: number;
}

export interface DotNavProps {
  active: boolean;
  onClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
}
