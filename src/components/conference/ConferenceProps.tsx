export interface ConferenceProps {
  id: number;
  round: number;
  title: string;
  date: string;
  createDate: string;
  files: FileProps[];
  postHits: number;
}

export interface FileProps {
  originName: string;
  url: string;
}
