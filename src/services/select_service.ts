import { ISelectService } from "../abstracts/select_service_interface";

export class SelectService implements ISelectService {
  //In class query builder
  readonly query: string;

  //constructor for base select query
  constructor(table: string, distinct: boolean) {
    //check for distinct parameters
    if (distinct) {
      this.query = `SELECT DISTINCT * FROM  ${table} `;
    } else {
      this.query = `SELECT * FROM  ${table} `;
    }

    //Returning the class select service
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
