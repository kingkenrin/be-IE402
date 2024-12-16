const modelBuildingModel = require('../models/modelBuilding.model')

class ModelBuildingService {
    static getAllModelBuilding = async () => {
        try {
            const modelBuildings = await modelBuildingModel.find({})

            return modelBuildings
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getModelBuildingById = async ({ id }) => {
        try {
            const modelBuilding = await modelBuildingModel.findById(id)

            if (!modelBuilding) {
                return {
                    success: false,
                    message: "wrong model building"
                }
            }

            return modelBuilding
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addModelBuilding = async ({ model, name }) => {
        try {
            const modelBuilding = await modelBuildingModel.findOne({ name: name })

            if (modelBuilding) {
                return {
                    success: false,
                    message: "model building exists"
                }
            }

            const newmodelBuilding = new modelBuildingModel({
                model, name
            })

            const savedmodelBuilding = await newmodelBuilding.save()

            return savedmodelBuilding
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateModelBuilding = async ({ id, model, name }) => {
        try {
            const modelBuilding = await modelBuildingModel.findById(id)

            if (!modelBuilding) {
                return {
                    success: false,
                    message: "wrong model building"
                }
            }

            const existmodelBuilding = await modelBuildingModel.findOne({ name: name })

            if (existmodelBuilding && modelBuilding.name != name) {
                return {
                    success: false,
                    message: "model building exist"
                }
            }
            else {
                modelBuilding.name = name
            }

            if (model)
                room.model = model

            const savedmodelBuilding = await modelBuilding.save()

            return savedmodelBuilding
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteModelBuilding = async ({ id }) => {
        try {
            const modelBuilding = await modelBuildingModel.findByIdAndDelete(id)

            if (!modelBuilding) {
                return {
                    success: false,
                    message: "wrong model building"
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

module.exports = ModelBuildingService;