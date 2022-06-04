export interface Post {
  id: number;
  header: string;
  title: string;
  writer: string;
  likes: number;
  tag: string;
  comments: number;
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
