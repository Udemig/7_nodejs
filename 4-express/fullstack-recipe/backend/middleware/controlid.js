import { readRecipes } from "../model/recipeModel.js";

const { success, data } = readRecipes();


// next parametresi middleware'de olmazsa olmazdır, çünkü çalıştıktan sonra sıradaki
// yazılıma geçiş yapılmasını sağlar. Next çalışmazsa istek başarıyla atılmaz.

const controlId = (req, res, next) => {

    const { id } = req.params

    // zaten okuduğumuz tarif verilerinden aradığımız tarifi bulmak için, 
    // data değerinin içinde gönderilen ID'ye sahip bir tarif var mı bak

    const found = data.find(
        (recipe) => recipe.id == id
    )

    // eğer bir tarif bulunduysa bu tarifi al ve
    // req(istek) objesine bir değer olarak tak

    if (!found) {

        return res.status(404).json({
            success:false,
            message:"Aradığınız ID'li tarif bulunamadı."
        })

    }

    // bunu yaptığımızda, middleware'den sonraki fonksiyonlar req.recipe ile tarife erişebilirler
    req.recipe = found;

    // sorun yoksa ilerki adıma devam edebilirsin
    next();
}

export default controlId;