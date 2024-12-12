const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Room'
const COLLECTION_NAME = 'Rooms'

var RoomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    floor: {
        type: Number,
        required: true,
    },
    modelId: {
        type: String,
        required: true,
    },
    //price per month
    price: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
    },
    bedRoom: {
        type: Number,
    },
    restRoom: {
        type: Number,
    },
    description: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, RoomSchema);