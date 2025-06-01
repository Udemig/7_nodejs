const http = require('http');
const url = require('url')

// -------------------------- BASİT İSTEKLER

// const server = http.createServer((req,res)=>{
//     console.log("sunucuya istek atıldı!")

//     if(req.url === '/' && req.method === "GET"){
//         res.writeHead(200);
//         res.end('Ana Sayfa')
//     } else if (req.url === "/hakkinda" && req.method === "GET"){
//         res.writeHead(200)
//         res.end('Hakkında sayfası')
//     }
//     else {
//         res.writeHead(404)
//         res.end('Geçersiz bir sayfaya istek attınız.')
//     }
// })


// ------------------------------- QUERY


// const server = http.createServer((req,res)=>{

//     const parsedUrl = url.parse(req.url,true);

//     if(parsedUrl.pathname === '/search' && parsedUrl.query.q)
//     {
//         res.writeHead(200);
//         res.end(`Merhaba "${parsedUrl.query.q}" araması yaptınız.`)
//     }
//     else{
//         res.writeHead(404)
//         res.end('Yol bulunamadı.')
//     }

// })

// ---------------------------- POST

// const server = http.createServer((req,res)=>{
//     if(req.method === "POST" && req.url === '/gonder') {
//         let body = '';

//         req.on('data',chunk=>{
//             body+=chunk
//         });

//         req.on('end',()=>{
//             res.writeHead(200);
//             res.end(`Veri alındı: ${body}`)
//         })
//     }
// })

const PORT = 3000;

server.listen(PORT, ()=>{console.log(`Sunucu ${PORT} portundan istekleri dinlemeye başladı.`)})