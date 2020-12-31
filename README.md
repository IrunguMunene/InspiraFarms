# inspirafarms

ANSWER TO EXERCISE B:

Given more time and resource I would have an ETL process that computes the consumed energy per device every hour and update a datawarehouse.
The API would then connect to the datawarehouse and query energy consumption information when needed. This would make the process much faster
than having the API send raw SQL to the database to get the data that is then computed upon each request. With the datawarehouse solution
the API would be querying a few field a simple select. Another option would be to have the current SQL used in the API consumption.route.config.ts file
stored as either a view or stored procedure that the API would then query from.

ANSWER TO EXERCISE C:

Have the API generate billing emails/smses that would be sent to each client on a daily, weekly or monthly basis, depending on the clients preference, this way the user would receive
their bills at their own convenience without the need to interact with a web portal.

The answer to exercise A has been developed using; 
    nodejs, 
    express.js for routing, 
    debug a module that I have used to avoid calling console.log() while developing the api, 
    winston is responsible for logging requests to the API and the responses (and errors) returned,
    cors is a piece of Express.js middleware that enables cross-origin resource sharing,
    and typescript using VS Code.

In the process, I have also played a little with inheritance by having a base route from which other routes would derive. I took this as an opportunity to somewhat show case my skill in backend development to the extent possible the exercise allowed without overdoing or having excess code than the project would require. I have tried as much as possible to comment the code and make it readable and easier to understand at first glance. However, feel free to ask any question where something might not be clear.

npm install should get the necessary dependencies installed upon which either npm run debug will run the api
showing a lot of debug information, as its meant to mimic a dev environment, 

while npm run start will mimic a production environment.

 "debug": "SET DEBUG=* && npm run start", in the package,json will work for a windows environment but should be changed to  "debug": "export DEBUG=* && npm run start", in any unix based environment to avoid errors on trying to run the api.
