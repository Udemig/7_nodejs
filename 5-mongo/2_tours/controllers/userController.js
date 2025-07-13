import User from "../models/userModel.js"

export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find();

        if(users.length <= 0){
            return res.status(404).send({
                success:false,
                message:'Veritabanında hiç kullanıcı yok.',
            })
        }

        // console.log(users)

        return res.status(200).send({
            success: true,
            message: "Bütün kullanıcılar getirildi.",
            count: users.length,
            data: users
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: 'Bir hata oluştu',
            error: err.message
        })
    }
}