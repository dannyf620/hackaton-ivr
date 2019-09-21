
export interface PossibleTransition {
  title: string;
  type: string;
  name: string;
}

export interface CurrentState {
  name: string;
  title: string;
  question: string;
}

export interface IState {
  uuid: string;
  metadata: any[];
  phone: string;
  updated_at: string;
  created_at: string;
  possible_transitions: PossibleTransition[];
  current_state: CurrentState;
}

export interface IStateResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: IState;
}
