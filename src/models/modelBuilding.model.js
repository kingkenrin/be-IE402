const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'ModelBuilding'
const COLLECTION_NAME = 'ModelBuildings'

var ModelBuildingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    model: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, ModelBuildingSchema);