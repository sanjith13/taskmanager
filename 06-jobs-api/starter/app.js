require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const app = express();
const authentication = require('./middleware/authentication');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.set('trust proxy',1);
app.use(rateLimiter({ 
  windowMs : 15*60*1000,
  max:100,
}));
// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authentication,jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
