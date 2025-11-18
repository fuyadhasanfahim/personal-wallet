import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        type: {
            type: String,
            required: true,
            enum: [
                'income',
                'expense',
                'borrowed',
                'returned',
                'lent',
                'repaid',
            ],
        },
        amount: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: '',
        },
        personName: {
            type: String,
            default: null,
        },
        personContact: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    { timestamps: true }
);

const TransactionModel = model('Transaction', TransactionSchema);
export default TransactionModel;
