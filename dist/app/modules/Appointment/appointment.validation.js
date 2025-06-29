"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Helper: Validate MongoDB ObjectId
const objectId = zod_1.z
    .string()
    .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
});
exports.appointmentValidationSchema = zod_1.z.object({
    doctorId: objectId,
    serviceId: objectId,
    selectedDate: zod_1.z.coerce.date(), // handles string/Date
    timeSlot: zod_1.z.string().regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/, {
        message: 'Time slot must be in the format HH:MM-HH:MM',
    }),
});
