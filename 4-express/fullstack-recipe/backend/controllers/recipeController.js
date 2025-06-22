import fs from 'fs'
import { readRecipes, writeRecipes } from '../model/recipeModel.js'
import { isInvalid } from '../utils/isInvalid.js';
import crypto from 'crypto'

//tarifleri oku, başarılı olma(success) ve veri(tarifleri) geri döndür
const { success, data } = readRecipes();

export const getAllRecipes = (req, res) => {

    // tarif verisinin kopyasını oluştur

    let recipes = [...data];

    // aratılan kelimeyi (küçük harfle)

    const search = req.query?.search?.toLowerCase();

    // eğer search parametresi geldiyse filtreleme yap
    if (search) {

        recipes = recipes.filter((recipe) =>
            recipe.recipeName.toLowerCase().includes(search)
        );
    }


    // order parametresi geldiyse sıralama yap
    if (req.query.order) {
        recipes.sort((a, b) =>
            req.query.order === "asc"
                ? a.recipeTime - b.recipeTime
                : b.recipeTime - a.recipeTime
        )
    }



    // HATA KISMI BURASI ---- OKUMA İŞLEMİNDE HATA OLURSA BURAYA TAKILACAK
    // hata verimiz direkt data olarak geldiğinden, ismini değiştirmemize gerek yok
    if (!success) {
        return res.status(500).json({
            success: false,
            message: "Sunucu tarafında bir hata oldu.",
            data
        })
    }


    // burada ise datanın üzerinde değişiklik yaptığımız için, en son hali olan recipes'i gönderiyoruz.
    return res.status(200).json({
        success: true,
        message: "Tarif verileri başarıyla alındı.",
        count: recipes.length,
        data: recipes
    })
}


export const createRecipe = (req, res) => {

    // kullanıcıdan gelen body'den bütün alanları al
    let newRecipe = req.body;

    // eğer hatalıysa burası çalışır
    if (isInvalid(newRecipe)) {
        return res.status(400).send({
            success: false,
            message: "Lütfen bütün alanları doldurunuz."
        })
    }

    // veriye id ve foto ekle
    newRecipe = {
        // newRecipe'de önceden olan bütün değerleri çektik
        ...newRecipe,
        // rastgele eşsiz bir ID oluşturduk
        id: crypto.randomUUID(),
        // rastgele resim gelsin diye seed verdik ve seedi rastgele oluşturduk
        image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`
    }


    // tarif verisini okuduğumuz diziye ekle

    data.push(newRecipe);

    // json dosyasının üstüne yazarak güncelle

    const { error } = writeRecipes(data)

    if (error) {
        return res.status(500).json({
            success: false,
            message: "Tarif verisi eklenirken bir sorun oluştu.",
            error
        })
    }


    return res.status(201).json({
        success: true,
        message: "Tarifiniz başarıyla eklendi.",
        newRecipe
    })
}



export const getRecipe = (req, res) => {

    const recipe = req.recipe

    return res.status(200).send({
        success: true,
        message: "Tarif başarıyla getirildi.",
        data: recipe
    })
}





export const updateRecipe = (req, res) => {

    // ...req.recipe kullanarak orijinal tarifin değerlerini al
    // sonrasında ...req.body kullanarak bu orijinal değerlerin üzerine
    // body'de gönderilen güncellenmiş değerleri yazarak güncel tarifi oluştur

    const updated = { ...req.recipe, ...req.body }

    // güncellencek elemanın sırasını bulmalıyız
    const index = data.findIndex((i) => i.id === req.params.id);

    //diziyi güncelle, 2 yöntem var:

    // data.splice(index,1,updated);

    // data'nın içinde aradığımız elemanın sırasına sahip elemanı getir ve onu updated değeri olarak güncelle
    data[index] = updated;

    // json dosyasını güncel haliyle yaz
    const { error, success } = writeRecipes(data);

    if (!success) {
        return res.status(500).send({
            success: false,
            message: "Yazma işlemi yapılırken bir hata oluştu.",
            error
        })
    }


    res.status(201).send({
        success: true,
        message: "Aradığınız eleman başarıyla güncellendi.",
        data: updated
    })
}




// tarif silme
export const deleteRecipe = (req, res) => {

    // 1) filter ile silme
    const updatedRecipes = data.filter(
        (i) => i.id !== req.recipe.id
    );

    // // 2) index-splice ile silme
    // // params'tan gelen idye sahip elemanın(silmek istenen eleman) data dizisi içindeki sıra numarasını bul
    // const index = data.findIndex((i) => i.id === req.params.id)

    // // silmek istediğimiz elemanın sırasından başlayarak 1 eleman kaldır (silinecek elemanı kaldır)
    // data.splice(index,1)


    // json dosyasını güncelle
    writeRecipes(updatedRecipes);


    res.status(200).send({
        success:true,
        message:"Tarif başarıyla silindi."
    })
}