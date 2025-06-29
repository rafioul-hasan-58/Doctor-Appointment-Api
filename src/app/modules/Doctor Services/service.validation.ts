import { z } from 'zod';
import { Types } from 'mongoose';

// ObjectId validator
const objectId = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

// Time slot validator: HH:MM-HH:MM
const timeSlot = z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, {
  message: 'Time slot must be in the format HH:MM-HH:MM',
});

// Availability object schema
const availabilitySchema = z.record(z.array(timeSlot));

// Full IService validation schema
export const serviceValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().nonnegative({ message: 'Price must be positive' }),
  duration: z.number().int().positive({ message: 'Duration must be a positive integer' }),
  doctor: objectId,
  availability: availabilitySchema,
});
