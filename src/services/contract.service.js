const contractModel = require('../models/contract.model')
const userModel = require('../models/user.model')
const roomModel = require('../models/room.model')

class ContractService {
    static getAllContract = async () => {
        try {
            const contracts = await contractModel.find({}).populate('userId').populate('roomId')

            return contracts
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getContractById = async ({ id }) => {
        try {
            const contract = await contractModel.findById(id).populate('userId').populate('roomId')

            if (!contract) {
                return {
                    success: false,
                    message: "wrong contract"
                }
            }

            return contract
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getContractByUserId = async ({ userId }) => {
        try {
            const user = await userModel.findById(userId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            const contract = await contractModel.find({ userId: userId }).populate('userId').populate('roomId')

            return contract
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addContract = async ({ userId, roomId, month, total, deposit, state, startDay, endDay, name, phone, email, note }) => {
        try {
            const user = await userModel.findById(userId)
            const room = await roomModel.findById(roomId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            if (!room) {
                return {
                    success: false,
                    message: "wrong room"
                }
            }

            if (room.isAvailable === false) {
                return {
                    success: false,
                    message: "room is not available"
                }
            }

            let startdayTemp = undefined
            let enddayTemp = undefined

            if (startDay) {
                const time = startDay.split('/')
                startdayTemp = new Date(time[2], time[1] - 1, time[0])
            }

            if (endDay) {
                const time = endDay.split('/')
                enddayTemp = new Date(time[2], time[1] - 1, time[0])
            }

            if (startdayTemp.getTime() >= enddayTemp.getTime()) {
                return {
                    success: false,
                    message: "start day must be less than end day"
                }
            }

            room.isAvailable = false

            await room.save()

            const newContract = new contractModel({
                userId,
                roomId,
                month,
                total,
                deposit,
                state,
                startDay: startdayTemp,
                endDay: enddayTemp,
                name,
                phone,
                email,
                note
            })

            const savedContract = await newContract.save()

            return savedContract
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateContract = async ({ id, month, total, deposit, state, startDay, endDay, note }) => {
        try {
            const contract = await contractModel.findById(id)
            const room = await roomModel.findById(contract.roomId)

            if (!contract) {
                return {
                    success: false,
                    message: "wrong contract"
                }
            }

            if (month)
                contract.month = month

            if (total)
                contract.total = total

            if (deposit)
                contract.deposit = deposit

            if (state) {
                if (state == "Cancel") {
                    room.isAvailable == true

                    await room.save()
                }

                contract.state = state
            }

            if (note) {
                contract.note = note
            }

            if (startDay) {
                const time = startDay.split('/')
                const startdayTemp = new Date(time[2], time[1] - 1, time[0])
                contract.startDay = startdayTemp
            }

            if (endDay) {
                const time = endDay.split('/')
                const enddayTemp = new Date(time[2], time[1] - 1, time[0])
                contract.endDay = enddayTemp
            }

            if (contract.startDay.getTime() >= contract.endDay.getTime()) {
                return {
                    success: false,
                    message: "start day must be less than end day"
                }
            }

            const savedContract = await contract.save()

            return savedContract
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteContract = async ({ id }) => {
        try {
            const contract = await contractModel.findByIdAndDelete(id)

            if (!contract) {
                return {
                    success: false,
                    message: "wrong contract"
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

    static payment = async ({ amount, orderInfo, roomId, userId, name, phone, email, note, month, total, startDay, endDay }) => {
        try {
            // test momo:
            // NGUYEN VAN A
            // 9704 0000 0000 0018
            // 03/07
            // OTP
            // các thông tin đổi để hiện trên Hóa đơn thanh toán: orderInfo, ,amount, orderID,...
            //Đổi redirectURL, ipnURL theo trang web của mình
            var accessKey = 'F8BBA842ECF85';
            var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';//key để test // không đổi
            var partnerCode = 'MOMO';
            var redirectUrl = 'http://localhost:5173/thanh-toan'; // Link chuyển hướng tới sau khi thanh toán hóa đơn
            var ipnUrl = 'http://localhost:5173/thanh-toan';   //trang truy vấn kết quả, để trùng với redirect
            var requestType = "payWithMethod";
            // var amount = '1000'; // Lượng tiền của hóa  <lượng tiền test ko dc cao quá>
            var orderId = partnerCode + new Date().getTime(); // mã Đơn hàng, có thể đổi
            var requestId = orderId;
            // var extraData = `items-${JSON.stringify(items)}+voucher-${voucher}+userId-${userId}+method-${method}+from-${from}+name-${name}+phone-${phone}+address-${address}`; // đây là data thêm của doanh nghiệp (địa chỉ, mã COD,....)
            var extraData = encodeURIComponent(
                JSON.stringify({
                    roomId: roomId,
                    userId: userId,
                    name: name,
                    phone: phone,
                    email: email,
                    note: note,
                    month: month,
                    total: total,
                    startDay: startDay,
                    endDay: endDay
                })
            )
            var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
            var orderGroupId = '';
            var autoCapture = true;
            var lang = 'vi'; // ngôn ngữ
            console.log("res==================", extraData)

            // không đụng tới dòng dưới
            var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
            //puts raw signature
            console.log("--------------------RAW SIGNATURE----------------")
            console.log(rawSignature)
            //chữ ký (signature)
            const crypto = require('crypto');
            var signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');
            console.log("--------------------SIGNATURE----------------")
            console.log(signature)

            // data gửi đi dưới dạng JSON, gửi tới MoMoEndpoint
            const requestBody = JSON.stringify({
                partnerCode: partnerCode,
                partnerName: "Test",
                storeId: "MomoTestStore",
                requestId: requestId,
                amount: amount,
                orderId: orderId,
                orderInfo: orderInfo,
                redirectUrl: redirectUrl,
                ipnUrl: ipnUrl,
                lang: lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData: extraData,
                orderGroupId: orderGroupId,
                signature: signature
            });
            // tạo object https
            const https = require('https');
            const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            }
            //gửi yêu cầu tới momo, nhận lại kết quả trả về 
            // Link chuyển hướng tới momo là payUrl, trong phần body của data trả về
            return new Promise((resolve, reject) => {
                const req = https.request(options, res => {
                    console.log(`Status: ${res.statusCode}`);
                    console.log(`Headers: ${JSON.stringify(res.headers)}`);
                    res.setEncoding('utf8');
                    res.on('data', (body) => {
                        console.log('Body: ');
                        console.log(body);
                        resolve(JSON.parse(body));
                        console.log('resultCode: ');
                        console.log(JSON.parse(body).resultCode);
                    });
                    res.on('end', () => {
                        console.log('No more data in response.');
                    });
                })

                req.on('error', (e) => {
                    console.log(`problem with request: ${e.message}`);
                    reject(error)
                });
                // write data to request body
                console.log("Sending....")
                req.write(requestBody);
                req.end();
            })
            // dữ liệu trả về khi thành công: ?partnerCode=MOMO&orderId=MOMO1713984978976&requestId=MOMO1713984978976&amount=1000&orderInfo=30k&orderType=momo_wallet&transId=4029232035&resultCode=0&message=Thành+công.&payType=credit&responseTime=1713985045244&extraData=&signature=0d6f0e650eb5d320c3a65df17a620f01c09d0eae742d3eb7e84177b2ebda6fe0
        } catch (error) {
            return {
                success: false,
                message: error.message,
            }
        }
    }
}

module.exports = ContractService;