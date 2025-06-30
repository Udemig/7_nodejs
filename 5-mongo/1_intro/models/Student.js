import mongoose from "mongoose";

// Öğrenci nesnemizin içinde bulunması gereken verileri belirtiyoruz. Taslağı oluşturduk
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    school: {
        type: String,
        required: true
    }
})

// Bu taslağa göre veritabanında ayrı bir kısım(collection-model) oluşturacağız.
const studentModel = mongoose.model('Student', studentSchema)

export default studentModel;