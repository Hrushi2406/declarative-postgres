export interface IDeleteService {
  //or
  orWhere: ({ column, operator, value } : ILogicalDeleteServiceInput) => void;

  //and
  andWhere: ({ column, operator, value } : ILogicalDeleteServiceInput) => void;

  //returning deleted rows
  returning: (cols : string[]) => void;

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

//orWhere / andWhere input interface
export interface ILogicalDeleteServiceInput {
  column: string;
  operator: string;
  value: string;
}
