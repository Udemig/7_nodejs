import User from "../models/userModel.js"
import { getAll } from "./handlerFactory.js"

export const getAllUsers = async (req, res) => {
    try {
        getAll(User, req, res);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ success: false, message: 'Bir hata oluştu', error: err.message })
    }
}