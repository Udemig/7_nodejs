import express from 'express'
import { createRecipe, deleteRecipe, getAllRecipes, getRecipe, updateRecipe } from '../controllers/recipeController.js';
import controlId from '../middleware/controlid.js';




// Router  => server.js dosyasında kullanılacak yönleri (endpoint/routes) belirlememizi sağlar.

// bir router örneği alırız
const router = express.Router();

// oluşturulan router örneğine endpointleri/routeları/yolları tanıtırız ve istek gelince çalışacak fonksiyonları belirleriz.


// örn. api/v1/recipes'e istek atılırsa isteği bu zincir yakalar
router
    .route('/api/v1/recipes')
    .get(getAllRecipes)
    .post(createRecipe)



// id path parametresini kullanacağımız alanlar şunlardır:

// spesifik bir tarifi getirmek 
// spesifik bir tarifi güncellemek
// spesifik bir tarifi silmek

router
    .route('/api/v1/recipes/:id') // => buradaki :id 'nin parametre olduğunu express otomatik olarak algılar.
    .get(controlId, getRecipe)
    .patch(controlId, updateRecipe)
    .delete(controlId, deleteRecipe)


// ana sunucuya bu rotaları tanıtmak için routerı export edip, ana sunucuda import etmemiz gerekir.
export default router;