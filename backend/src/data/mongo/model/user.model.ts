import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'User model is required']
    },
    email: {
        type: String,
        required: [true, 'Email model is required'],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Password model is required']
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: [String],
        default: '',
    }
},{ collection: 'User' });

export const UserModel = mongoose.model('User', UserSchema);
