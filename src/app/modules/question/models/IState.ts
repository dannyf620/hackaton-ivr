
interface IOptions {
  title: string;
  name: string;
  type: string;
}




export interface CurrentState {
  title: string;
  question: string;
}

export interface IState {
  uuid: string;
  metadata: any[];
  updated_at: string;
  created_at: string;
  possible_transitions: {[key: string]: IOptions};
  current_state: CurrentState;
}

export interface IStateResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: IState;
}
