export interface RuleProps {
  id: number;
  title: string;
  userName: string;
  postHits: number;
  createDate: string;
  fileList: string;
}

export interface DetailProps {
  id: number;
  title: string;
  text: string;
  createDate: string;
  fileList: string;
  postHits: number;
}
