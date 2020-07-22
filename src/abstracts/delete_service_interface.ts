export interface IDeleteService {
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
export interface IDeleteServiceInput {
  table: string;
  column: string;
  operator: string;
  value: string;
}
