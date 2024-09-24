import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User model is required']
    },
    email: {
        type: String,
        required: [true, 'Email model is required'],
        unique: true
    },
    img: {
        type: String,
        default: ''
    },
    departament: {
        type: String,
        required: [true, 'Departament model is required']
    },
    cellphone: {
        type: String,
        required: [true, 'Cellphone model is required']
    },
    status: {
        default: 'inactive',
        type: String,
        enum: ['active','inactive'],
    }
},{ collection: 'Staff' });

export const StaffModel = mongoose.model('Staff', StaffSchema);
