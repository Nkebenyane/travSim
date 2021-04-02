const readline = require('readline');
const fs = require("fs");

let path = process.argv;

readfile(path);

function readfile(path) {

    for (let i = 2; i < path.length; i++) {

        if (fs.existsSync(path[i])) {

            var myInterface = readline.createInterface({
                input: fs.createReadStream(path[i])
            });

            var lineno = 1;
            var output = ' ';

            myInterface.on('line', function (line) {
                console.log('file name: ' + path[i]);

                for (j = 0; j < line.length; j++) {

                    if (line.startsWith('var') || line.startsWith('const') || line.startsWith('let')) {
                        let ends = line.endsWith(';', line.length);
                        if (line[j] == '=') {
                            if (line[j - 1] == ' ' && line[j + 1] == ' ') {
                                if (!ends) {
                                    output = 'Line number ' + lineno + ' : ' + '"' + line + '"' + ' no semi colon';
                                }
                            } else {
                                output = 'Line number ' + lineno + ' : ' + '"' + line + '"' + ' - no space';
                                if (!ends) {
                                    output = output + ' and no semi colon';
                                }
                            }
                        }
                    }
                }
                lineno++;
                console.log(output);
            })
        } else {
            console.log('file name: ' + path[i] + ' 404, file not found! \n');
        }
    }
    return output;
}

