export interface IDeleteService {
  //or
  or: () => void;

  //and
  and: () => void;

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
