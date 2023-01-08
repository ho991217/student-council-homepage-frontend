export interface RuleProps {
  id: number;
  title: string;
  userName: string;
  postHits: number;
  createDate: string;
  fileList: FileProps[];
}

export interface DetailProps {
  id: number;
  title: string;
  text: string;
  createDate: string;
  fileList: FileProps[];
  postHits: number;
}

export interface FileProps {
  originName: string;
  url: string;
}
