
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';


const app: Application = express()
// parser
app.use(express.json())
app.use(cookieParser());
// routes
app.use('/api', router);
// testing
const test = async (req: Request, res: Response) => {
  res.send('Server Is Running!!!')
}
app.get('/', test);

app.use(globalErrorHandler)
// app.use('*', notFoundPage);


export default app 