import mongoose, { Schema } from 'mongoose';

const AttSchema = new mongoose.Schema({
  arrivalTime: {
    type: Date,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },  
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    default: 'absent'
  },
  comment: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{ collection: 'Attendance' });

export const AttModel = mongoose.model('Attendance', AttSchema);

