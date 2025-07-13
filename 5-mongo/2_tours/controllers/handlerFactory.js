// HANDLER FACTORY, PEK ÇOK İSTEĞİ STANDARDİZE EDEREK BÜTÜN MODELLERDE ORTAK OLAN FONKSİYONLARI TEK BİR YERDE TOPLAR.

import APIFeatures from "../utils/apiFeatures.js"

// Belirli bir koleksiyonun içindeki bütün dökümanları al

export const getAll = async (Model,req,res) => {
    try {
        // Yukarıda Model parametresini almamızın amacı, bu fonksiyonu her veri türü için kullanabilmektir.

        // ÖRN. Tours dizisindeki bütün elemanları getireceksek, 
        // yukarıdaki Model parametresine Tour modelini veririz ve o koleksiyonda arama yapar,
        // Users'tan getireceksek yukraıdaki modele User parametresini veririz ve User koleksiyonunda arama yapar.

        
        // bu api isteği hem bütün turları, hem de eğer tourId varsa spesifik bir turu getirebilir

        let filters = {};

        if(req.params.tourId) filters = { tour: req.params.tourId}


        // filtreleme, sıralama ve pagination mantığı için standart sistemi oluşturduk, ve sıra bunu kullanmaya geldi
        const features = new APIFeatures(Model.find(filters), req.query, req.formattedParams)
        .filter()
        .limit()
        .sort()
        .pagination()


        // yukarıda oluşturulan features sorgusunu çalıştır ve dökümanları getir

        const documents = await features.query;


        return res.status(200).send({
            success:true,
            message: `${Model.modelName} koleksiyonundaki bütün veriler getirildi.`,
            data: documents
        })

    } catch (error) {
     
        return res.status(500).send({
            success:false,
            error: error.message,
            error
        })
    }
}