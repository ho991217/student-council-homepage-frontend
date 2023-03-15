export interface NewsProps {
  id: number;
  title: string;
  createdDate: string;
  files: FileProps[];
  views: number;
}

export interface DetailProps {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  files: FileProps[];
}

export interface FileProps {
  id: number;
  url: string;
  originName: string;
}
