import {
  IDeleteService,
  IDeleteServiceInput,
} from "../abstracts/delete_service_interface";

export class DeleteService implements IDeleteService {
  //In class query builder
  private query: string;

  //constructor for base delete query
  constructor({ table, column, operator, value }: IDeleteServiceInput) {
    if(typeof value === "string"){
      this.query = `DELETE FROM ${table} WHERE ${column} ${operator} ${value} `;
    }else{
      let valuestring: String = '(' + value.join(',') + ')';
      this.query = `DELETE FROM ${table} WHERE ${column} ${operator} ${valuestring} `;
    }
    

    //Returning the class object delete service
    return this;
  }

  and() {
    //Building query
    this.query = this.query + `AND `;

    return this;
  }

  or() {
    this.query = this.query + `OR `;

    return this;
  }

  returning(cols : string[] = []){
    if(cols.length == 0){
      this.query = this.query + `RETURNING *`;
    }
    else{
      let colString = cols.join(',');
      this.query = this.query + `RETURNING `+ colString;
    }

    return this;
  }

  //In class executer
  async execute() {
    //Log the query
    this.log();

    // return await this.db.query(this.finalQuery);
  }

  /**
   * In class logger for Select query
   */
  log() {
    console.log(this.query);
  }
}
