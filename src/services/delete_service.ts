import {
  IDeleteService,
  IDeleteServiceInput,
  ILogicalDeleteServiceInput,
} from "../abstracts/delete_service_interface";

export class DeleteService implements IDeleteService {
  //In class query builder
  private query: string;

  //constructor for base delete query
  constructor({ table, column, operator, value }: IDeleteServiceInput) {
    this.query = `DELETE FROM ${table} WHERE ${column} ${operator} ${value} `;

    //Returning the class object delete service
    return this;
  }

  andWhere({ column, operator, value } : ILogicalDeleteServiceInput) {
    //Building query
    this.query = this.query + `AND ${column} ${operator} ${value} `;

    return this;
  }

  orWhere({ column, operator, value } : ILogicalDeleteServiceInput) {
    this.query = this.query + `OR ${column} ${operator} ${value} `;

    return this;
  }

  returning(cols : string[] = []){
    if(cols.length == 0){
      this.query = this.query + `returning *`;
    }
    else{
      let colString = cols.join(',');
      this.query = this.query + `returning `+ colString;
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
