import Tour from "../models/tourModel.js";
import { getAll } from "./handlerFactory.js";

export const getAllTours = async (req, res) => {
    try{
        getAll(Tour, req, res);
    }
    catch(err){
        console.error(err)
    }
}