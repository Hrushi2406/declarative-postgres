export interface IInsertService {
  
    //returning inserted row
    returning: (cols : string[]) => void;
  
    //In class executer
    execute: () => void;
  
    //In class Logger
    log: () => void;
  }
  
  //Input Interfaces
  export interface IInsertServiceInput {
    table: string;
    cols: string[];
    values: any[];
  }
  
  