export interface TileProps {
  title?: string;
  linkTitle?: string;
  to: string;
  detail?: string;
}

export interface NewsProps {
  id: string;
  title: string;
}

export interface PetitionProps {
  id: string;
  title: string;
  d_day: number;
  petitionStatus: '답변대기' | '기간만료' | '진행중' | '청원종료';
}

export interface ConferenceProps {
  id: string;
  title: string;
}
