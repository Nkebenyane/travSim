let search = 'avengers';
const https = require('https');

let url = 'https://www.omdbapi.com/?apikey=ba1f4581&s=' + search;

https.get(url, response => {
    response.setEncoding("utf8");
    let body = "";
    response.on("data", data => {
        body += data;
    });
    response.on("end", () => {
        body = JSON.parse(body);
        console.log(body);
    });
});