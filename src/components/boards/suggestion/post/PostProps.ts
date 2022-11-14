export interface PostProps {
  id: number;
  answer: string;
  category: string;
  commentList: Comment[];
  createDate: string;
  fileList: [];
  postHits: number;
  text: string;
  title: string;
  mine: boolean;
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
