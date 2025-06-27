
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express'


const app: Application = express()
// parser
app.use(express.json())
app.use(cookieParser());
// routes
// app.use('/api/', router)
// testing
const test = async (req: Request, res: Response) => {
  res.send('Server Is Running!!!')
}
app.get('/', test)

export default app