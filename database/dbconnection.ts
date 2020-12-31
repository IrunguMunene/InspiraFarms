import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export default class DbConnection {
    private static _instance: DbConnection;

    connection: mysql.Connection;
    connected: boolean = false;
    
    constructor() {
        this.connection = mysql.createConnection({
            host: '54.220.20.71',
            user: 'participant',
            password: 'Xbs6P*ggPo',
            database: 'iot_data'
        });

        this.connect();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static query(query:string, callback: Function){
        this.instance.connection.query(query, (err:Error, results: Object[], fields:[]) => {

            if(err){
                callback(err);
            }
            else if(results.length===0){
                callback('There is no record');
            }
            else{
                callback(null, results);
            }
        })
    }

    private connect(){
        this.connection.connect((err:mysql.MysqlError) => {
            if(err){
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('MySQL Connection established!');
            
        })
    }
} 