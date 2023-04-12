export interface RuleProps {
  author : string;
  blinded : boolean;
  body : string;
  commentCount : number;
  createdAt : string;
  department : string;
  files : FileProps[];
  id : number;
  likes : number;
  tag : [];
  title : string;
  views : number;
}

export interface DetailProps {
  author : string;
  blinded : boolean;
  body : string;
  createdAt : string;
  files : FileProps[];
  id : number;
  liked : boolean;
  likes : number;
  mine : boolean;
  tag : [];
  title : string;
  views : number;
}

export interface FileProps {
  originalName: string;
  url: string;
}
