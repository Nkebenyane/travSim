
let searh = 'avengers';
const https = require('https');

let url = 'https://www.omdbapi.com/?apikey=ba1f4581&s=' + searh;

https.get(url, respond => {
    res.setEncoding("utf8");
    let body = "";
    respond.on("data", data => {
        body += data;
    });
    respond.on("end", () => {
        body = JSON.parse(body);
        console.log(body);
    });
});