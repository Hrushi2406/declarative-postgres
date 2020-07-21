export interface ISelectService {
  //In class Query
  readonly query: string;

  //Where
  //   where: () => void;

  //In class executer
  execute: () => void;

  //In class Logger
  log: () => void;
}

//Input Interfaces
export interface ISelectServiceInput {
  table: string;
  distinct?: boolean;
}
