// This is a route class inherits from the BaseRoute class.
import express from 'express';
import { BaseRoute } from '../common/base.routes.config';
import DbConnection from '../database/dbconnection';

// Query statement creates a LAG function. The LAG consumption value is then subtracted from the current minutes
// consumption to get the minute by minute consumption per device. These values are then summed to show the daily
// energy consumption per device for the last seven days as per the instructions in exercise A.
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

export class EnergyConsumptionRoute extends BaseRoute {
    constructor(app: express.Application) {
        super(app, 'EnergyConsumptionRoute');
    }

    configureRoute() {
        this.app.route('/consumption').get((req: express.Request, res: express.Response) => {
            DbConnection.query(queryStr, (err: Error, result: Object[]) => {
                if(err){
                    res.status(400).json({
                        ok: false,
                        err,
                    });
                }else{
                    res.status(200).json({
                        ok: true,
                        data: result
                    });
                }
            })
        });
        
        this.app.route('/consumption/:deviceId').get((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next()
        }).get((req: express.Request, res: express.Response) => {
            res.status(200).send(`GET requested for device id ${req.params.deviceId}`);
        });

        return this.app;
    }
}