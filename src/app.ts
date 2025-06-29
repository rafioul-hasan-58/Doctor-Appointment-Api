
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
import { appointmentController } from './app/modules/Appointment/appointment.controller';
import auth from './app/middleware/auth';


const app: Application = express()
// parser
app.use(express.json())
app.use(cookieParser());
// routes
app.use('/', router);
app.get('/doctor/appointments', appointmentController.getDoctorAppointments);
app.get('/doctor/appointments/:id', appointmentController.getSingleAppointment);
app.patch('/doctor/appointments/:id/status',auth(['doctor']), appointmentController.changeAppointmentStatus);
app.get('/patient/appointments', auth(['patient']), appointmentController.getPatientAppointments);

// testing
const test = async (req: Request, res: Response) => {
  res.send('Server Is Running!!!')
}
app.get('/', test);

app.use(globalErrorHandler)
// app.use('*', notFoundPage);


export default app 