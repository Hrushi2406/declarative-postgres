import { IWhereInputInterface } from "./reuseable_abstracts/where_interface";

export interface ISelectService {
  //Where
  where: ({ column, operator, value }: IWhereInputInterface) => void;

  //And
  and: () => void;

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
