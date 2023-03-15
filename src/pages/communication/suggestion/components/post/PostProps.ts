export interface PostProps {
  author: string;
  body: string;
  createdAt: string;
  files: [];
  id: number;
  mine: boolean;
  tag: [];
  title: string
}

interface Comment {
  id: number;
  name: string;
  time: string;
  text: string;
  mine: boolean;
  status: string;
  anonymousNum: number;
}
