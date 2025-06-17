const fs = require('fs');

// parametre olarak gelen araç verilerini json dosyasına yazan fonksiyon

module.exports = (cars) => {

    fs.writeFile(
        `${__dirname}/../data/cars.json`,
        JSON.stringify(cars),

        (error)=>{
            if(error){
                console.log('bir hata oluştu:',error)
            }
            return;
        }

    )
}