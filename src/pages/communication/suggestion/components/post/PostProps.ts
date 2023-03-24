export interface PostProps {
  author: string;
  body: string;
  createdAt: string;
  files: [];
  id: number;
  mine: boolean;
  tag: [];
  title: string;
  likes: number;
  liked: boolean;
}

interface CommentData {
  mine: boolean
}
export interface CommentProps {
  createdAt: string;
  id: number;
  major: string;
  text: string;
  length: number;
  mine: boolean;
}
