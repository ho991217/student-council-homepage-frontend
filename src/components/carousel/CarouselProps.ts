export interface CarouselProps {
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
}
