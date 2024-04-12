export interface IPostHomeType {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: Date;
  author: { name: string };
  authorID: string,
}

export interface IPostProps {
  data: IPostHomeType;
}