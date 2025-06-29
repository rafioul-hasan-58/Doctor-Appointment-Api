import { z } from 'zod';
import { Types } from 'mongoose';

// Helper: Validate MongoDB ObjectId
const objectId = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const appointmentValidationSchema = z.object({
  doctorId: objectId,
  serviceId: objectId,
  selectedDate: z.coerce.date(), // handles string/Date
  timeSlot: z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, {
    message: 'Time slot must be in the format HH:MM-HH:MM',
  }),
});
