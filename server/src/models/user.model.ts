import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        authId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: ['super-admin', 'admin', 'user'],
            default: 'user',
        },
        currency: {
            type: String,
            default: 'BDT',
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system',
        },
        language: {
            type: String,
            default: 'en',
        },
    },
    { timestamps: true }
);

const UserModel = model('User', UserSchema);
export default UserModel;
