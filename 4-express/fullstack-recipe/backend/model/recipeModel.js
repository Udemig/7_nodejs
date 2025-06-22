import fs from 'fs'


export const readRecipes = () => {
    try {
        const data = fs.readFileSync('./data/recipes.json', 'utf-8');
        const text = JSON.parse(data);

        console.log('başarıyla okuma işlemi yapıldı.')

        return {
            success: true,
            data: text
        }

    } catch (error) {

        console.log(error)
        return {
            success: false,
            data: error.message
        }
    }
}


// parametre olarak aldığı veriyi json dosyasına yazan fonksiyon

export const writeRecipes = (data) => {

    try {
        fs.writeFileSync('./data/recipes.json', JSON.stringify(data));

        return {
            success: true
        }
    }
    catch (error) {
        console.log(error)

        return {
            success: false,
            error: error.message
        }
    }

}