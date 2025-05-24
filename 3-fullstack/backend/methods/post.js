const bodyParser = require("../utils/bodyParser");


// burada kaldık

const postRequest = async (req,res)=>{

    if(req.url === "/api/movies"){
        const body = await bodyParser(req);

        console.log(body)
    }


    return res.end("POST isteği attınız.")
}

module.exports = postRequest;