var express = require('express');
var router = express.Router();
var fs = require('fs');
var pathToWatchfolder = 'public/routes/verzeichnis';
var files = fs.readdirSync('public/routes/verzeichnis/');
var jquery = require('jquery');
let compareBoxes = ["topleft", "topright", "bottomleft", "bottomright"];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Raytracing Viewer', condition: false });
});

router.get('/test', function(req, res, next) {
    res.render('test', { title: 'testpage' });
});

try {
    fs.watch(pathToWatchfolder, (eventType, filename) => {
        console.log('event type is: '+eventType);
        files = fs.readdirSync(pathToWatchfolder);
        if (filename) {
            console.log('filename provided: '+filename);
            generateRoutes();
        } else {
            console.log('filename not provided');
        }
    });
}catch(err){
    console.log(err);
}

function generateRoutes() {
    for (var i = 0; i < files.length; i++) {
        //console.log(files[i]);
        var route = (files[i]);
        generateRoute(route);
    }
}

function generateRoute(route){
    router.get('/' + route, (req, res, next) => {
        var pictures = fs.readdirSync(pathToWatchfolder+'/'+route+'/samples');
        //console.log(pictures);
        res.render('compare', { title: route, condition: false, path: route, pictures: pictures, compareBoxes: compareBoxes});
        //console.log(route + " wurde aufgerufen!");
    })
}


generateRoutes();
module.exports = router;
