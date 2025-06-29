"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidationSchema = void 0;
const zod_1 = require("zod");
// Time slot validator: HH:MM-HH:MM
const timeSlot = zod_1.z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, {
    message: 'Time slot must be in the format HH:MM-HH:MM',
});
// Availability object schema
const availabilitySchema = zod_1.z.record(zod_1.z.array(timeSlot));
// Full IService validation schema
exports.serviceValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().nonnegative({ message: 'Price must be positive' }),
    duration: zod_1.z.number().int().positive({ message: 'Duration must be a positive integer' }),
    availability: availabilitySchema.optional(),
});
