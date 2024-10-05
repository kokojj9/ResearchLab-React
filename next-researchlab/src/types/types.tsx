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
