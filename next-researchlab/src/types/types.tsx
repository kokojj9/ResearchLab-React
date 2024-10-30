export interface Post {
  postNo: number;
  title: string;
  content: string;
  writer: string;
  views: number;
  imageList: image[];
  createDate: string;
}

type image = {
  imageNo: number;
  title: string;
  originName: string;
  storedName: string;
  file: File;
};

export interface Member {
  memberNo: number;
  memberId: string;
  email: string;
  token: string;
}

export interface CalculationResult {
  iteration: number;
  previousAmount: number;
  currentAmount: number;
  profit: number;
  rate: number;
  cumulativeRate: number;
}

export interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}
