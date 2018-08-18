const myPythonScriptPath = 'ConvertEXRtoJPG.py';
const sherholz = './python/batchToneMapper.py';

var PythonShell = require('python-shell');
//var pyshell = new PythonShell(myPythonScriptPath);


module.exports = {
    convertEXRtoPNG: function(exrFilePath, pngFilePath)
    {
        var options = {
            mode: 'text',
            args: [exrFilePath,pngFilePath]
        };
        var pyshell = new PythonShell(sherholz, options);

        pyshell.on('message', message => {
            console.log(message);
        });

        pyshell.end(function (err) {
            if (err) {
                console.log('error occurs in pyshell end function');
            }

            console.log('finished');
        });

    }

};

