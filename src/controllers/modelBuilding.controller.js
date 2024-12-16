const modelBuildingService = require('../services/modelBuilding.service')

class ModelBuildingController {
    getAllModelBuilding = async (req, res, next) => {
        try {
            return res.status(201).json(await modelBuildingService.getAllModelBuilding())
        } catch (error){
            next(error)
        }
    }

    getModelBuildingById = async (req, res, next) => {
        try {
            return res.status(201).json(await modelBuildingService.getModelBuildingById(req.params))
        } catch (error){
            next(error)
        }
    }

    addModelBuilding = async (req, res, next) => {
        try {
            return res.status(201).json(await modelBuildingService.addModelBuilding(req.body))
        } catch (error){
            next(error)
        }
    }

    updateModelBuilding = async (req, res, next) => {
        try {
            return res.status(201).json(await modelBuildingService.updateModelBuilding(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteModelBuilding = async (req, res, next) => {
        try {
            return res.status(201).json(await modelBuildingService.deleteModelBuilding(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new ModelBuildingController();