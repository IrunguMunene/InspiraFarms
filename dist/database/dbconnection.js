"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DbConnection {
    constructor() {
        this.connected = false;
        this.connection = mysql_1.default.createConnection({
            host: '54.220.20.71',
            user: 'participant',
            password: 'Xbs6P*ggPo',
            database: 'iot_data'
        });
        this.connect();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static query(query, callback) {
        this.instance.connection.query(query, (err, results, fields) => {
            if (err) {
                callback(err);
            }
            else if (results.length === 0) {
                callback('There is no record');
            }
            else {
                callback(null, results);
            }
        });
    }
    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log('MySQL Connection established!');
        });
    }
}
exports.default = DbConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGJjb25uZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZGF0YWJhc2UvZGJjb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLG9EQUE0QjtBQUM1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQXFCLFlBQVk7SUFNN0I7UUFGQSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBR3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLGdCQUFnQixDQUFDO1lBQ3JDLElBQUksRUFBRSxjQUFjO1lBQ3BCLElBQUksRUFBRSxhQUFhO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxVQUFVO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sTUFBTSxLQUFLLFFBQVE7UUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBWSxFQUFFLFFBQWtCO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFTLEVBQUUsT0FBaUIsRUFBRSxNQUFTLEVBQUUsRUFBRTtZQUU5RSxJQUFHLEdBQUcsRUFBQztnQkFDSCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQ0ksSUFBRyxPQUFPLENBQUMsTUFBTSxLQUFHLENBQUMsRUFBQztnQkFDdkIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDbEM7aUJBQ0c7Z0JBQ0EsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLE9BQU87UUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQW9CLEVBQUUsRUFBRTtZQUM3QyxJQUFHLEdBQUcsRUFBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRWpELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBL0NELCtCQStDQyJ9