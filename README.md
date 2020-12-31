# inspirafarms

ANSWER TO EXERCISE B:

Given more time and resource I would have an ETL process that computes the consumed energy per device every hour and update a datawarehouse.
The API would then connect to the datawarehouse and query energy consumption information when needed. This would make the process much faster
than having the API send raw SQL to the database to get the data that is then computed upon each request. With the datawarehouse solution
the API would be querying a few field a simple select. Another option would be to have the current SQL used in the API consumption.route.config.ts file
stored as either a view or stored procedure that the API would then query from.

ANSWWER TO EXERCISE C:

Have the API generate billing emails/smses that would be sent to each client on a daily, weekly or monthly basis, depending on the clients preference, this way the user would receive
their bills at their own convenience without the need to interact with any app.
