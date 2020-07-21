import { Pool, Client } from "pg";
import { IwhereInput } from "./interfaces";

//Type of Database Instance
type dbInstance = Pool | Client;

abstract class IDeclarativePostgres {
  //SELECT query
  abstract select(table: string): void;

  //select distinct
  abstract selectDistinct(table: string): void;

  //WHere COndition
  abstract where({ column, operator, value }: IwhereInput): void;

  //Sort
  abstract sort({ sortBy }: { sortBy: string }): void;

  //Execute The query
  abstract execute(): void;
}

class DeclarativePostgres implements IDeclarativePostgres {
  //Instance of Postgres Database

  private db: dbInstance;
  private finalQuery: string;

  //   constructor({ databaseInstance }: { databaseInstance: dbInstance }) {
  //   Assigning Instance of postgres Db
  //   this.db = databaseInstance;
  //   }

  constructor() {
    this.finalQuery = "";
    this.db = new Client();
  }
  selectDistinct(table: string): void {
    throw new Error("Method not implemented.");
  }
  sort({ sortBy }: { sortBy: string }): void {
    throw new Error("Method not implemented.");
  }

  /**
   *
   * @param table
   *
   */

  select(table: string) {
    this.finalQuery = `SELECT * FROM  ${table} `;
    return this;
  }

  where({ column, operator, value }: IwhereInput) {
    this.finalQuery = this.finalQuery + `WHERE ${column} ${operator} ${value} `;
  }

  log(): void {
    console.log(this.finalQuery);
  }

  async execute() {
    return await this.db.query(this.finalQuery);
  }
}

const db = new DeclarativePostgres();

db.select("users").where({ column: "Hrushi", operator: "==", value: "jas" });

// db.where({ column: "Hrushi", operator: "==", value: "jas" });
// db.execute();

db.log();
