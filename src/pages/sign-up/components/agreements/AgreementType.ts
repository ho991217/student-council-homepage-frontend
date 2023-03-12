export interface Term {
  id: number;
  agreed: boolean;
  type: '선택' | '필수';
  title: string;
  content: string;
  details: {
    title: string;
    content: string;
  }[];
  notice: string;
}
