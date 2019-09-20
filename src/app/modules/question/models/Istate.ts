export interface Istate {
  uuid: string;
  title: string;
  options: IOptions[];
}

interface IOptions {
  title: string;
  name: string;
  type: string;
}
