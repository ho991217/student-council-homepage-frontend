export interface PostProps {
  id: number;
  answer: string;
  category: string;
  commentList: Comment[];
  createDate: string;
  fileList: [];
  text: string;
  title: string;
  mine: boolean;
  likeCount: number;
  like: boolean;
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
