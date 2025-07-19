import Tour from "../models/tourModel.js";
import { getAll, getSingle } from "./handlerFactory.js";

export const getAllTours = async (req, res) => {
    try {
        getAll(Tour, req, res);
    }
    catch (err) {
        console.error(err)
    }
}

export const getSingleTour = async (req, res) => {
    try {
        getSingle(Tour, req, res);
    }
    catch (err) {
        console.error(err)
    }
}

export const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        return res.status(201).json({ message: "Yeni tur oluşturuldu", success: true, data: newTour });

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}