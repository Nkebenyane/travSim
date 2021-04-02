var readline = require('readline');
var fs = require('fs');

process.argv.forEach(function (val, index, argv) {
    

    var myInterface = readline.createInterface({
        input: fs.createReadStream(val)
    });

    var lineno = 1;
    var output = ' ';


    if (index > 1) {
        if (fs.lstatSync(val).isFile()) {
            output += 'file name: ' + val;
            myInterface.on('line', function (line) {
                for (i = 0; i < line.length; i++) {
                    if (line.startsWith('var') || line.startsWith('const') || line.startsWith('let')) {
                        let ends = line.endsWith(';', line.length);
                        if (line[i] == '=') {
                            if (line[i - 1] == ' ' && line[i + 1] == ' ') {
                                if (!ends) {
                                    output = 'Line number ' + lineno + ' : ' + '"' + line + '"' + ' no semi colon';
                                }
                            } else {
                                output = 'Line number ' + lineno + ' : ' + '"' + line + '"' + ' - no space';
                                if (!ends) {
                                    output += ' and no semi colon';
                                }
                            }
                        }
                    }
                }
                lineno++;
                console.log(output);
            })
        }
    }
});