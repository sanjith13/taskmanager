require('dotenv').config()
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlingMiddleware = require('./middleware/error-handler');
//middleware
app.use(express.json());
app.use(express.static('./public'))
const port = process.env.PORT || 5000;
//routes
app.use('/api/v1/tasks',tasks);
app.use(notFound);
app.use(errorHandlingMiddleware);
const start = async () => {
   try {
       await connectDB(process.env.MONGO_URL);
       app.listen(port,console.log(`server is running on ${port} ...`));

   } catch (error) {
       console.log(error);
   }
} 
 
start();

