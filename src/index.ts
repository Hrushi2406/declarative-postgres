import { Pool, Client } from "pg";
import { IwhereInput } from "./interfaces";
import { SelectService } from "./select_service";
import { IselectServiceInput } from "./abstracts/select_service_interface";

//Type of Database Instance
type dbInstance = Pool | Client;

class DeclarativePostgres {
  //Instance of Postgres Database
  private db: dbInstance;

  //final Query to be executed
  private finalQuery: string;

  //select instance
  private selectInstance: SelectService | null = null;

  //Temporary Constructor
  constructor() {
    //creating empty string
    this.finalQuery = "";

    //new client
    this.db = new Client();
  }

  //Actual constructor to be used in production
  //   constructor({ databaseInstance }: { databaseInstance: dbInstance }) {
  //   Assigning Instance of postgres Db
  //   this.db = databaseInstance;
  //   }

  /**
   * SELECT * FROM given table name
   *
   * @param query
   */
  select({ table, distinct = false }: IselectServiceInput) {
    //creating a new instance of SelectService
    this.selectInstance = new SelectService(table, distinct);

    //return the select instance
    return this.selectInstance;
  }

  //Declarative Postgres Logger
  log(): void {
    console.log(this.finalQuery);
  }

  //Executing the final query
  async execute() {
    //Null checker for select instance
    if (this.selectInstance) {
      //assigning final query to select instance query
      this.finalQuery = this.selectInstance.query;
    }

    //Executing the query
    const result = await this.db.query(this.finalQuery);

    //returning actual response
    return result;
  }
}

//createing a instace of declarative postgres
const postInstance = new DeclarativePostgres();

//Select query from declarative postgres
postInstance.select({ table: "postgres", distinct: true }).log();

//executing query
postInstance.execute();

//declarative postgres logger
postInstance.log();
