export interface PostProps {
  id: number;
  status: string;
  title: string;
  likes: number;
  tag: string;
  commentList: Comment[];
  createdAt: string;
  dueDate: string;
  contents: JSX.Element;
}

export interface Comment {
  id: number;
  writer: string;
  contents: string;
  createdAt: string;
}
