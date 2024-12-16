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
            "https://www.xotels.com/wp-content/uploads/2022/07/Executive-Room-XOTELS.webp",
            "https://www.decorpot.com/images/blogimage1361284108interior-designs-for-master-bedroom.jpg",
            "https://toancanhbatdongsan.com.vn/uploads/images/blog/anhtong/2022/04/12/can-ho-cao-cap-1649735963.jpg",
            "https://hungthinh.com.vn/wp-content/uploads/2021/05/Can-ho-cao-cap-la-gi.jpg",
            "https://noithatnamviet.com/wp-content/uploads/2022/06/thiet-ke-thi-cong-noi-that-chung-cu-quan-7-12.jpg",
            "https://static-images.vnncdn.net/files/publish/nhieu-du-an-can-ho-cao-cap-len-toi-hon-130-trieu-dongm2-d3f769fe15f3445cb5d7f6a3aebd44f4.jpg"
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