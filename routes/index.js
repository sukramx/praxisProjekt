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

/**
 * Es wird der Ordner in der Variable pathToWatchfolder ueberwacht.
 * veraendert sich etwas an der Ordnerstruktur, z.B. es kommt ein neuer Ordner hinzu,
 * wird eine neue Route generiert mit dem Namen des Ordners.
 */
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

/**
 * Wird bei Serverstart aufgerufen. Hier werden alle vorhandenen Routen generiert.
 */
function generateRoutes() {
    for (var i = 0; i < files.length; i++) {
        //console.log(files[i]);
        var route = (files[i]);
        generateRoute(route);
    }
}

/**
 * Hier wird die Route generiert. Es werden dem Jade Modul die Bilder und der Routenname mitgegeben.
 * @param route enthaelt den Namen der Route
 */
function generateRoute(route){
    router.get('/' + route, (req, res, next) => {
        var pictures = fs.readdirSync(pathToWatchfolder+'/'+route+'/samples');
        //console.log(pictures);
        res.render('content', { title: route, condition: false, path: route, pictures: pictures, compareBoxes: compareBoxes});
        //console.log(route + " wurde aufgerufen!");
    })
}


generateRoutes();

module.exports = router;
