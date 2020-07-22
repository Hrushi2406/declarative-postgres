import { ISelectService } from "../abstracts/select_service_interface";
import { IWhereInputInterface } from "../abstracts/reuseable_abstracts/where_interface";

export class SelectService implements ISelectService {
  //In class query builder
  private query: string;

  //constructor for base select query
  constructor(table: string, distinct: boolean, onColumn?: string) {
    //check for distinct parameters
    if (distinct && onColumn) {
      this.query = `SELECT DISTINCT ON (${onColumn}) * FROM ${table} `;
    } else if (distinct && !onColumn) {
      throw new Error("If distinct is true than you should provide on column");
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

  //and operators
  and() {
    //Building query
    this.query = this.query + `AND `;

    return this;
  }

  //or query
  or() {
    this.query = this.query + `OR `;

    return this;
  }

  groupBy({ column }: { column: string }) {
    this.query = this.query + `GROUP BY ${column} `;

    return this;
  }

  having({
    column,
    operator,
    value,
    aggregatedFunction,
  }: IWhereInputInterface) {
    if (aggregatedFunction) {
      this.query =
        this.query +
        `HAVING aggregatedFunction (${column}) ${operator} ${value} `;
    } else {
      this.query = this.query + `WHERE ${column}) ${operator} ${value} `;
    }
  }

  // custom query
  custom(query: string) {
    this.query = query;

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
