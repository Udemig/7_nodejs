import mongoose from "mongoose"
import Student from '../models/Student.js'



// Bütün kullanıcıları çeken fonksiyon

export const getAllUsers = async (req, res) => {
    try {
        // find fonksiyonunun içi boş bırakılırsa bütün studentları getirir.
        const students = await Student.find()

        // aldığımız studentları direkt olarak gönderebiliriz.
        return res.status(200).send({
            success: true,
            message: "Bütün kullanıcılar getirildi.",
            data: students
        })
    }
    catch (err) {
        return res.status(400).send(err)
    }
}


// YENİ KULLANICI(STUDENT) OLUŞTURMA FONKSIYONU

export const addUser = async (req, res) => {
    try {
        // öncelikle db'ye yüklenecek öğrencinin bir örneğini oluşturmalıyız.
        const student = new Student(req.body)

        // sonrasında bu örneği database'e kaydetmeliyiz
        await student.save()

        console.log("YENİ KULLANICI OLUŞTURULDU.")

        return res.status(201).send({
            success: true,
            message: "Kullanıcı başarıyla oluşturuldu.",
            data: student
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}


// ------------------------------------------------------------------------------

// Tek bir kullanıcıyı getirmek.
export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).send({
                success: false,
                message: "Aradığınız ID'ye sahip kullanıcı bulunamadı."
            })
        }

        return res.status(200).send({
            success: true,
            message: "Aradığınız kullanıcı başarıyla bulundu.",
            data: student
        })


    } catch (err) {
        return res.status(400).send({
            success: false,
            error: err.message
        })
    }
}

//Tek bir kullanıcı silmek
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Student.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Silinecek IDye sahip öğrenci bulunamadı."
            })
        }

        return res.status(200).send({
            success: true,
            message: "Kullanıcı başarıyla silindi."
        })


    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: "Bir hata oluştu",
            data: err.message
        })
    }

}

// Kullanıcı güncellemek
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        
        // id'ye göre kullanıcıyı bul ve güncelle.
        // {new:true} => kullanıcının güncellendikten sonraki halini gönder
        const student = await Student.findByIdAndUpdate(id, req.body, {new: true})

        if(!student){
            return res.status(404).send({
                success:false,
                message:"Güncellemek istediğiniz kullanıcı bulunamadı."
            })
        }

        return res.status(201).send({
            success:true,
            message:"Kullanıcı başarıyla güncellendi",
            data: student
        })
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: "Bir hata oluştu",
            data: err.message
        })
    }
}