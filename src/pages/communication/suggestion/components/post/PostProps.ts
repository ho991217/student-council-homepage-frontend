export interface PostProps {
  author: string;
  body: string;
  createdAt: string;
  files: {id:string, url:string}[];
  id: number;
  mine: boolean;
  tag?: [
    {
      id: number;
      name: string;
    },
  ];
  title: string;
  likes: number;
  liked: boolean;
}
export interface CommentProps {
  createdAt: string;
  id: number;
  major: string;
  text: string;
  length: number;
  mine: boolean;
  author: string;
  authorMajor: string;
}
