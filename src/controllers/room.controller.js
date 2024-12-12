const roomService = require('../services/room.service')

class RoomController {
    getAllRoom = async (req, res, next) => {
        try {
            return res.status(201).json(await roomService.getAllRoom())
        } catch (error){
            next(error)
        }
    }

    getRoomById = async (req, res, next) => {
        try {
            return res.status(201).json(await roomService.getRoomById(req.params))
        } catch (error){
            next(error)
        }
    }

    addRoom = async (req, res, next) => {
        try {
            return res.status(201).json(await roomService.addRoom(req.body))
        } catch (error){
            next(error)
        }
    }

    updateRoom = async (req, res, next) => {
        try {
            return res.status(201).json(await roomService.updateRoom(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteRoom = async (req, res, next) => {
        try {
            return res.status(201).json(await roomService.deleteRoom(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new RoomController();