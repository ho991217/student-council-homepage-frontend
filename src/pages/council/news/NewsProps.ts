export interface NewsProps {
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
  files: FileProps[];
  postHits: number;
}

export interface FileProps {
  id: number;
  originName: string;
  url: string;
}
