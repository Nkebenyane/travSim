let search = process.argv;

console.log(search);

fetchmovie(search);

function fetchmovie(search) {
    const https = require('https');

    for (let i = 2; i < search.length; i++) {
        console.log(search[i]);

        let url = 'https://www.omdbapi.com/?apikey=ba1f4581&s=' + search[i];

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
    }
}
