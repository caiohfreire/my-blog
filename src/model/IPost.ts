export interface IPostHomeType {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: Date;
  authorID: string,
}

export interface IPostProps {
  data: IPostHomeType;
}