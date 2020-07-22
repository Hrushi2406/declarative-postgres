import { ISelectService } from "../abstracts/select_service_interface";
import { IWhereInputInterface } from "../abstracts/reuseable_abstracts/where_interface";

export class SelectService implements ISelectService {
  //In class query builder
  private query: string;

  //constructor for base select query
  constructor(table: string, distinct: boolean) {
    //check for distinct parameters
    if (distinct) {
      this.query = `SELECT DISTINCT * FROM ${table} `;
    } else {
      this.query = `SELECT * FROM ${table} `;
    }

    //Returning the class select service
    return this;
  }

  where({ column, operator, value }: IWhereInputInterface) {
    //Building query
    this.query = this.query + `WHERE ${column} ${operator} ${value} `;

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
