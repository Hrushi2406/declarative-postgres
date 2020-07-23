import { IInsertServiceInput, IInsertService } from '../abstracts/insert_service_interface'

export class InsertService implements IInsertService {
    //In class query builder
    private query: string;

    //constructor for base insert query
    constructor({ table, cols, values }: IInsertServiceInput) {
        
        let valuestring: String = '(' + values.join(', ') + ')';
        if(cols.length == 0){
            this.query = `INSERT INTO ${table} VALUES ` + valuestring;
        }
        else{ 
            let inscolstring: String = '(' + cols.join(', ') + ')';  
            this.query = `INSERT INTO ${table} `+ inscolstring + ' VALUES ' + valuestring;
        }
        //Returning the class object insert service
        return this;
    }

    returning(cols: string[] = []) {
        if (cols.length == 0) {
            this.query = this.query + ` RETURNING *`;
        }
        else {
            let colString = cols.join(',');
            this.query = this.query + ` RETURNING ` + colString;
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

