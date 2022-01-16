require('dotenv').config();
require('express-async-handler');

const express =  require('express');
const app = express();

const connectDB = require('./db/connect');

const products =require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware =require('./middleware/error-handler');
app.use(express.json());
//app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
  });
  
app.use('/api/v1/products',products);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;


const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("connected to the database");
        app.listen(port,console.log(`server is listening on ${port} ...`));
    } catch (error) {
        console.log("sorry something went wrong",error);    
    }
}
start();

