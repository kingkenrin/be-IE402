const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Room'
const COLLECTION_NAME = 'Rooms'

var RoomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    images: {
        type: [String],
        default: [
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734490015/webchungcu/hinh-anh-can-ho-chung-cu-dep-3_fvp5z7.jpg",
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734489925/webchungcu/nhieu-du-an-can-ho-cao-cap-len-toi-hon-130-trieu-dongm2-d3f769fe15f3445cb5d7f6a3aebd44f4_zhp4z4.jpg",
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734489920/webchungcu/thiet-ke-thi-cong-noi-that-chung-cu-quan-7-12_k6ofpp.jpg",
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734489911/webchungcu/Can-ho-cao-cap-la-gi_c7jsyr.jpg",
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734489900/webchungcu/can-ho-cao-cap-1649735963_qpfjgn.jpg",
            "https://res.cloudinary.com/dxtslecpc/image/upload/v1734489889/webchungcu/blogimage1361284108interior-designs-for-master-bedroom_kju8rh.jpg"
        ]
    },
    floor: {
        type: Number,
        required: true,
    },
    modelId: {
        type: Schema.Types.ObjectId,
        ref: 'ModelBuilding',
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