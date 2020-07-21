import { IDeleteService } from "./abstracts/delete_service_interface";

export class DeleteService implements IDeleteService {
  //In class query builder
  readonly query: string;

  //constructor for base delete query
  constructor(table: string) {
    this.query = `DELETE FROM  ${table} `;
    

    //Returning the class object delete service
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
