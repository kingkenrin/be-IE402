const bcrypt = require("bcrypt");
const userModel = require('../models/user.model')
const roomModel = require('../models/room.model')

class UserService {
    static getAlluser = async () => {
        try {
            const users = await userModel.find({}).populate('favouriteRooms')

            return users

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getUserById = async ({ id }) => {
        try {
            const user = await userModel.findById(id).populate('favouriteRooms')

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            return user
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addUser = async (file, { email, password, name, phone, role }) => {
        try {
            // const user = await userModel.findOne({ username: username })
            const emailExist = await userModel.findOne({ email: email })

            // if (user) {
            //     return {
            //         success: false,
            //         message: "username exists"
            //     }
            // }

            if (emailExist) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            const hash = bcrypt.hashSync(password, 10)

            const newuser = new userModel({
                // "username": username,
                "password": hash,
                "avatar": file ? file.path : undefined,
                "name": name,
                "phone": phone,
                "email": email,
                "role": role,
            })

            const saveduser = await newuser.save()

            return saveduser
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateUser = async (file, { id, oldPassword, newPassword, name, phone, email, role }) => {
        try {
            const user = await userModel.findById(id)

            const emailExist = await userModel.findOne({ email: email })

            if (emailExist && user.email != email) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }


            if (oldPassword && newPassword) {
                const check = await bcrypt.compare(oldPassword, user.password)

                if (!check) {
                    return {
                        success: false,
                        message: "wrong old password"
                    }
                }
                else {
                    const hash = bcrypt.hashSync(newPassword, 10)
                    user.password = hash
                }
            }

            if (name)
                user.name = name

            if (email)
                user.email = email

            if (phone)
                user.phone = phone

            if (role)
                user.role = role

            if (file)
                user.avatar = file.path

            const saveduser = await user.save()

            return saveduser
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteUser = async ({ id }) => {
        try {
            const user = await userModel.findByIdAndDelete(id)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
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

    static addFavouriteRoom = async ({ userId, roomId }) => {
        try {
            const user = await userModel.findById(userId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            const room = await roomModel.findById(roomId)

            if (!room) {
                return {
                    success: false,
                    message: "wrong room"
                }
            }

            if (user.favouriteRooms.some((room) => room.toString() == roomId)) {
                return {
                    success: false,
                    message: "room already added"
                }
            }

            user.favouriteRooms.push(roomId)

            const savedUser = await user.save()

            return savedUser
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = UserService;