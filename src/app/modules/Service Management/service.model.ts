import mongoose, { Schema, model } from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Doctor reference is required'],
    },
    availability: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

export const Service = model<IService>('Service', serviceSchema);
