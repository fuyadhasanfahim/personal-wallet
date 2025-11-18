import { Schema, model } from 'mongoose';

const AuthSchema = new Schema(
    {
        authId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        provider: {
            type: String,
            enum: ['credentials'],
            default: 'credentials',
        },
        image: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ['active', 'disabled'],
            default: 'active',
        },
        verified: {
            type: Boolean,
            default: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const AuthModel = model('Auth', AuthSchema);
export default AuthModel;
