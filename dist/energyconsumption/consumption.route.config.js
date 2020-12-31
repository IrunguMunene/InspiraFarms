"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyConsumptionRoute = void 0;
const base_routes_config_1 = require("../common/base.routes.config");
const dbconnection_1 = __importDefault(require("../database/dbconnection"));
// Query statement creates a LAG function. The LAG consumption value is then subtracted from the current minutes
// consumption to get the minute by minute consumption per device. These values are then summed to show the daily
// energy consumption per device for the last seven days.
const queryStr = `SELECT device_id, ConsumptionDate, SUM(TotalConsumed) AS PowerConsumedWh, SUM(TotalConsumed) /1000 AS PowerConsumedkWh
FROM
(
	SELECT a.device_id, DATE(a.rec_datetime) as ConsumptionDate, a.main_energy_consumption, a.previousConsumption,
		COALESCE((a.main_energy_consumption - a.previousConsumption), 0) AS TotalConsumed
	FROM
	(
		SELECT device_id, rec_datetime, main_energy_consumption,
			(
				SELECT main_energy_consumption FROM timestream ts1
					WHERE ts1.rec_datetime < ts.rec_datetime AND 
						ts1.device_id = ts.device_id
					ORDER BY rec_datetime DESC LIMIT 1
			) AS previousConsumption
		FROM  
		(
			SELECT device_id, rec_datetime, COALESCE(main_energy_consumption, 0) AS main_energy_consumption  FROM timestream
			GROUP BY device_id, rec_datetime, main_energy_consumption
		) ts
	) a
) b 
WHERE TotalConsumed > 0 AND 
(ConsumptionDate >= (SELECT DATE(MAX(rec_datetime)) - INTERVAL 7 DAY FROM timestream) AND
	ConsumptionDate <= (SELECT max(rec_datetime) FROM timestream))
GROUP BY device_id, ConsumptionDate`;
class EnergyConsumptionRoute extends base_routes_config_1.BaseRoute {
    constructor(app) {
        super(app, 'EnergyConsumptionRoute');
    }
    configureRoute() {
        this.app.route('/consumption').get((req, res) => {
            dbconnection_1.default.query(queryStr, (err, result) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                else {
                    res.status(200).json({
                        ok: true,
                        data: result
                    });
                }
            });
        });
        this.app.route('/consumption/:deviceId').get((req, res, next) => {
            next();
        }).get((req, res) => {
            res.status(200).send(`GET requested for device id ${req.params.deviceId}`);
        });
        return this.app;
    }
}
exports.EnergyConsumptionRoute = EnergyConsumptionRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3VtcHRpb24ucm91dGUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vZW5lcmd5Y29uc3VtcHRpb24vY29uc3VtcHRpb24ucm91dGUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLHFFQUF5RDtBQUN6RCw0RUFBb0Q7QUFFcEQsZ0hBQWdIO0FBQ2hILGlIQUFpSDtBQUNqSCx5REFBeUQ7QUFDekQsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0F3Qm1CLENBQUM7QUFFckMsTUFBYSxzQkFBdUIsU0FBUSw4QkFBUztJQUNqRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQy9FLHNCQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQVUsRUFBRSxNQUFnQixFQUFFLEVBQUU7Z0JBQzFELElBQUcsR0FBRyxFQUFDO29CQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNqQixFQUFFLEVBQUUsS0FBSzt3QkFDVCxHQUFHO3FCQUNOLENBQUMsQ0FBQztpQkFDTjtxQkFBSTtvQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDakIsRUFBRSxFQUFFLElBQUk7d0JBQ1IsSUFBSSxFQUFFLE1BQU07cUJBQ2YsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUNySCxJQUFJLEVBQUUsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUErQixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBOUJELHdEQThCQyJ9