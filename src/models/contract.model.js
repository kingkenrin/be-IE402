const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Contract'
const COLLECTION_NAME = 'Contracts'

var ContractSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    deposit: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        enum: ["Pending", "Done", "Cancel"],
        required: true,
    },
    note: {
        type: String,
    },
    startDay: {
        type: Date,
        required: true,
    },
    endDay: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ContractSchema);