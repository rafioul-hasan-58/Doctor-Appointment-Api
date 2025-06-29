import { Types } from 'mongoose';

export interface IAppointment {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  patientId: Types.ObjectId;
  selectedDate: Date;
  timeSlot: string; // e.g., "10:00-12:00"
  status: 'pending' | 'accepted' | 'cancelled' | 'completed';
}
