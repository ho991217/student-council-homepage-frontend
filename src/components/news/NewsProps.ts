export interface NewsProps {
  id: number;
  title: string;
  createdAt: string;
  file: string;
}

export interface DetailProps {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  fileName: string;
  fileCapacity: string;
  fileUrl: string;
}
