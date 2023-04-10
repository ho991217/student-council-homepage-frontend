export interface NewsProps {
  id: number;
  title: string;
  createdDate: string;
  createdAt: string;
  files: FileProps[];
  views: number;
}

export interface DetailProps {
  author : string;
  body : string;
  createdAt : string;
  files : FileProps[];
  id : number;
  liked : boolean;
  likes : number;
  mine : boolean;
  tag : [] ;
  title : string ;
  views : number;
}

export interface FileProps {
  id: number;
  url: string;
  originalName: string;
}
