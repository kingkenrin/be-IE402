const roomModel = require('../models/room.model')

class RoomService {
    static getAllRoom = async () => {
        try {
            const rooms = await roomModel.find({}).populate('modelId')

            return rooms
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getRoomById = async ({ id }) => {
        try {
            const room = await roomModel.findById(id).populate('modelId')

            if (!room) {
                return {
                    success: false,
                    message: "wrong room"
                }
            }

            return room
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addRoom = async ({ roomNumber, floor, modelId, price, size, bedRoom, restRoom, description, isAvailable }) => {
        try {
            const room = await roomModel.findOne({ roomNumber: roomNumber })

            if (room) {
                return {
                    success: false,
                    message: "room exists"
                }
            }

            const newroom = new roomModel({
                roomNumber, floor, modelId, price, size, bedRoom, restRoom, description, isAvailable
            })

            const savedroom = await newroom.save()

            return savedroom
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateRoom = async ({ id, roomNumber, floor, modelId, price, size, bedRoom, restRoom, description, isAvailable }) => {
        try {
            const room = await roomModel.findById(id)

            if (!room) {
                return {
                    success: false,
                    message: "wrong room"
                }
            }

            const existRoom = await roomModel.findOne({ roomNumber: roomNumber })

            if (existRoom && room.roomNumber != roomNumber) {
                return {
                    success: false,
                    message: "room exist"
                }
            }
            else{
                room.roomNumber = roomNumber
            }

            if (floor)
                room.floor = floor

            if (modelId)
                room.modelId = modelId
            
            if (price)
                room.price = price
            
            if (size)
                room.size = size
            
            if (bedRoom)
                room.bedRoom = bedRoom
            
            if (restRoom)
                room.restRoom = restRoom

            if (description)
                room.description = description

            if (isAvailable != undefined)
                room.isAvailable = isAvailable
            
            const savedroom = await room.save()

            return savedroom
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteRoom = async ({ id }) => {
        try {
            const room = await roomModel.findByIdAndDelete(id)

            if (!room) {
                return {
                    success: false,
                    message: "wrong room"
                }
            }

            return {
                success: true,
                message: "delete successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = RoomService;