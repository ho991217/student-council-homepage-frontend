export interface PostProps {
  id: number;
  status: string;
  title: string;
  commentCount: number;
  blind: boolean;
  postHits: number;
}

export interface Comment {
  id: number;
  writer: string;
  contents: string;
  createdAt: string;
}
