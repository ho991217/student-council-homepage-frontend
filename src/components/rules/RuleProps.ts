export interface RuleProps {
  id: number;
  title: string;
  departmentName: string;
  views: number;
  createdAt: string;
  file: string;
}

export interface DetailProps {
  id: number;
  title: string;
  createdAt: string;
  fileName: string;
  fileCapacity: string;
  fileUrl: string;
}
