const contractService = require('../services/contract.service')

class ContractController {
    getAllContract = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.getAllContract())
        } catch (error){
            next(error)
        }
    }

    getContractById = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.getContractById(req.params))
        } catch (error){
            next(error)
        }
    }

    getContractByUserId = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.getContractByUserId(req.params))
        } catch (error){
            next(error)
        }
    }

    addContract = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.addContract(req.body))
        } catch (error){
            next(error)
        }
    }

    updateContract = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.updateContract(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteContract = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.deleteContract(req.body))
        } catch (error){
            next(error)
        }
    }

    payment = async (req, res, next) => {
        try {
            return res.status(201).json(await contractService.payment(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new ContractController();