import { Pool, Client } from "pg";
import { SelectService } from "./services/select_service";
import { DeleteService } from "./services/delete_service";
import { ISelectServiceInput } from "./abstracts/select_service_interface";
import { IDeleteServiceInput } from "./abstracts/delete_service_interface";

//Type of Database Instance
type dbInstance = Pool | Client;

class DeclarativePostgres {
  //Instance of Postgres Database
  private db: dbInstance;

  //final Query to be executed
  private finalQuery: string;

  //select instance
  private selectInstance: SelectService | null = null;

  //delete instance
  private deleteInstance: DeleteService | null = null;

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
  select({ table, distinct = false }: ISelectServiceInput) {
    //creating a new instance of SelectService
    this.selectInstance = new SelectService(table, distinct);

    //return the select instance
    return this.selectInstance;
  }

  deleteWhere({ table, column, operator, value }: IDeleteServiceInput) {
    //creating a new instance of DeleteService
    this.deleteInstance = new DeleteService({
      table: table,
      column: column,
      operator: operator,
      value: value,
    });

    //return the delete instance
    return this.deleteInstance;
  }

  //Declarative Postgres Logger
  log(): void {
    console.log(this.finalQuery);
  }

  //Executing the final query
  async execute() {
    //Null checker for select instance
    // if (this.selectInstance) {
    //   //assigning final query to select instance query
    //   this.finalQuery = this.selectInstance.query;
    //   this.selectInstance = null;
    // }

    // if (this.deleteInstance) {
    //   //assigning final query to delete instance query
    //   this.finalQuery = this.deleteInstance.query;
    //   this.deleteInstance = null;
    // }

    //Executing the query
    const result = await this.db.query(this.finalQuery);

    //returning actual response
    return result;
  }
}

//createing a instace of declarative postgres
const postInstance = new DeclarativePostgres();

//Select query from declarative postgres
postInstance
  .select({ table: "postgres", distinct: true })
  .where({
    column: "id",
    operator: ">",
    value: " hrushi",
  })
  .or()
  .where({
    column: "id",
    operator: ">",
    value: " hrushi",
  })
  .log();

// //executing query
// postInstance.execute();

//Delete query from declarative postgres
postInstance.deleteWhere({
  table: "postgres",
  column: "id",
  operator: ">",
  value: " hrushi",
});

// //executing query
// postInstance.execute();

//declarative postgres logger
postInstance.log();
