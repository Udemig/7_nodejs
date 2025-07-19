// HANDLER FACTORY, PEK ÇOK İSTEĞİ STANDARDİZE EDEREK BÜTÜN MODELLERDE ORTAK OLAN FONKSİYONLARI TEK BİR YERDE TOPLAR.

import APIFeatures from "../utils/apiFeatures.js"

// Belirli bir koleksiyonun içindeki bütün dökümanları al

export const getAll = async (Model, req, res) => {
    try {
        // Yukarıda Model parametresini almamızın amacı, bu fonksiyonu her veri türü için kullanabilmektir.

        // ÖRN. Tours dizisindeki bütün elemanları getireceksek, 
        // yukarıdaki Model parametresine Tour modelini veririz ve o koleksiyonda arama yapar,
        // Users'tan getireceksek yukraıdaki modele User parametresini veririz ve User koleksiyonunda arama yapar.


        let filters = {};


        // filtreleme, sıralama ve pagination mantığı için standart sistemi oluşturduk, ve sıra bunu kullanmaya geldi
        const features = new APIFeatures(Model.find(filters), req.query, req.formattedParams)
            .filter()
            .limit()
            .sort()
            .pagination()


        // yukarıda oluşturulan features sorgusunu çalıştır ve dökümanları getir

        const documents = await features.query;


        return res.status(200).send({
            success: true,
            message: `${Model.modelName} koleksiyonundaki bütün veriler getirildi.`,
            data: documents
        })

    } catch (error) {

        return res.status(500).send({
            success: false,
            error: error.message,
            error
        })
    }
}


// Belirli bir koleksiyonun içindeki sadece bir tane dökümanı al
export const getSingle = async (Model, req, res) => {

    try {
        const documentId = req.params.id;

        // documentId parametresine sahip dökümanı bul
        const document = await Model.findById(documentId);

        // eğer bu döküman bulunmazsa hata döndür
        if (!document) {
            return res.status(404).send({ success: false, message: `Aradığınız ${Model.modelName} bulunamadı.` })
        }

        return res.status(200).send({
            success: true,
            message: `${Model.modelName} başarıyla getirildi.`,
            data: document
        })

    }
    catch (err) {

        return res.status(500).send({
            success: false,
            message: "Bir hata oluştu",
            data: err
        })
    }
}