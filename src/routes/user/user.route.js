const express = require('express')
const accessController = require('../../controllers/access.controller.js')
const userController = require('../../controllers/user.controller.js')
const roomController = require('../../controllers/room.controller.js')
const contractController = require('../../controllers/contract.controller.js')
const modelBuildingController = require('../../controllers/modelBuilding.controller.js')

const uploader = require('../../configs/config.cloudinary.js')

const router = express.Router()

//SIGNUP
router.post('/signUp', accessController.signUp)

//LOGIN
router.post('/login', accessController.login)

//FORGOTPASSWORD
router.post('/forgotPassword', accessController.forgotPassword)

//CONFIRMCODE
router.post('/confirmCode', accessController.confirmCode)

//USER
//[GET] Lay user theo id
router.get('/getUser/:id', userController.getUserById)

//[GET] Lay tat ca user
router.get('/getAllUser', userController.getAllUser)

//[POST] Them user
router.post('/addUser', uploader.single('avatar'), userController.addUser)

//[PUT] Sua user
router.put('/updateUser',uploader.single('avatar'),  userController.updateUser)

//[DELETE] Xoa user
router.delete('/deleteUser', userController.deleteUser)

//[POST] Them phong yeu thich
router.post('/addFavouriteRoom', userController.addFavouriteRoom)

//Room
//[GET] Lay Room theo id
router.get('/getRoom/:id', roomController.getRoomById)

//[GET] Lay tat ca Room
router.get('/getAllRoom', roomController.getAllRoom)

//[POST] Them Room
router.post('/addRoom', roomController.addRoom)

//[PUT] Sua Room
router.put('/updateRoom',roomController.updateRoom)

//[DELETE] Xoa Room
router.delete('/deleteRoom', roomController.deleteRoom)

//ModelBuilding
//[GET] Lay ModelBuilding theo id
router.get('/getModelBuilding/:id', modelBuildingController.getModelBuildingById)

//[GET] Lay tat ca ModelBuilding
router.get('/getAllModelBuilding', modelBuildingController.getAllModelBuilding)

//[POST] Them ModelBuilding
router.post('/addModelBuilding', modelBuildingController.addModelBuilding)

//[PUT] Sua ModelBuilding
router.put('/updateModelBuilding',modelBuildingController.updateModelBuilding)

//[DELETE] Xoa ModelBuilding
router.delete('/deleteModelBuilding', modelBuildingController.deleteModelBuilding)

//Contract
//[GET] Lay Contract theo id
router.get('/getContractById/:id', contractController.getContractById)

//[GET] Lay Contract theo userid
router.get('/getContractByUserId/:userId', contractController.getContractByUserId)

//[GET] Lay tat ca Contract
router.get('/getAllContract', contractController.getAllContract)

//[POST] Them Contract
router.post('/addContract', contractController.addContract)

//[PUT] Sua Contract
router.put('/updateContract',contractController.updateContract)

//[DELETE] Xoa Contract
router.delete('/deleteContract', contractController.deleteContract)

//Payment momo
router.post('/payment', contractController.payment)

module.exports = router
