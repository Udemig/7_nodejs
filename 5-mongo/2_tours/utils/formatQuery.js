

const formatQuery = (req, res, next) => {

    // urlden gelen parametre > duration: { lte: "10" }, price: { gte: "300" }
    // mongoDBnin istediği format > duration: { $lte: "10" }, price: { $gte: "300" }

    // yapmamız gereken urlden gelen parametreler eğer mongodb operatörüyse (lte,gte,lt,gt vs.) başlarına "$" işareti ekle.

    // 1) istekle gelen parametrelere eriş
    const queryObj = { ...req.query };

    
    // 2) filtrelemeye tabi tutulmayacak parametreleri (sort, page, fields, limit) query nesnesinden çıkart

    // delete queryObj.sort
    // delete queryObj.fields

    // daha basit ve modüler yol =>

        const deleteFields = ['sort','fields','page','limit'];
        deleteFields.forEach((el) => delete queryObj[el] )

    // 2) replace gibi string değiştirme metodlarını kullanmak için stringe çevir

    let queryString = JSON.stringify(queryObj);

    // 3) bütün mongo operatörlerinin başına $ ekle
    queryString = queryString.replace(/\b(gt|gte|lt|lte|ne)\b/g, match => `$${match}`);

    


    // 4) request nesnesine formatlanmış query ekliyoruz, 
    // bir sonraki middleware bu query'i kullanarak aradığımız tarzda nesneleri bulacak
    req.formattedParams = JSON.parse(queryString)

    req.formattedParams = parseQueryStrings(req.formattedParams);

    console.log("sorgu stringi:" , req.formattedParams)


    // sonraki fonksiyonun çalışmasına izin ver
    next();
}

export default formatQuery




function parseQueryStrings(queryObj) {
  const result = {};

  for (const [key, value] of Object.entries(queryObj)) {
    if (typeof value === 'string' && value.startsWith('{$')) {
      // "$gt:500" → '"$gt":500'
      const fixed = value.replace(/(\$\w+):/g, '"$1":');
      result[key] = JSON.parse(fixed);
    } else {
      result[key] = value;
    }
  }

  return result;
}