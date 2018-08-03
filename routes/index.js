var express = require('express');
var router = express.Router();
var fs = require('fs');
//var pathToWatchfolder = 'public/routes/verzeichnis';
var pathToWatchfolder = 'public/routes';
var files = fs.readdirSync('public/routes/');
var jquery = require('jquery');
let compareBoxes = ["topleft", "topright", "bottomleft", "bottomright"];


var jeriData;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Monte Carlo Rendering Algorithmen Evaluationstool', condition: false, routes: files });
});

/**
 * Es wird der Ordner in der Variable pathToWatchfolder ueberwacht.
 * veraendert sich etwas an der Ordnerstruktur, z.B. es kommt ein neuer Ordner hinzu,
 * wird eine neue Route generiert mit dem Namen des Ordners.
 */
try {
    fs.watch(pathToWatchfolder, (eventType, filename) => {
        console.log('event type is: '+eventType);
        let files = fs.readdirSync(pathToWatchfolder+'/');
        console.log(files);
        if (filename) {
            console.log('filename provided: '+filename);
            generateRoutes(files);
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
function generateRoutes(file) {
    if (file != undefined){
        files = file;
    }
    for (let i = 0; i < files.length; i++) {
        //console.log(files[i]);
        let route = (files[i]);
        generateRoute(route);
    }
}

/**
 * Hier wird die Route generiert. Es werden dem Jade Modul die Bilder und der Routenname mitgegeben.
 * @param route enthaelt den Namen der Route
 */
function generateRoute(route){
    router.get('/' + route, (req, res, next) => {
        //var pictures = fs.readdirSync(pathToWatchfolder+'/'+route+'/samples');
        var pictures = fs.readdirSync(pathToWatchfolder+'/'+route+"/scenes");
        console.log(pictures);
        let picture_json = {
            "name" : "",
            "iteration" : 0,
            "spp" : 0,
            "total" : 0,
            "path" : ""
        };

        let pictures_json = {
            "pictures" : []
        };

        //JERI.IO
        let jeridata = {
            title: route,
            children: [

            ]
        };


        for (let i=0; i<pictures.length;i++) {
            const data = require('../' + pathToWatchfolder + '/' + route + '/scenes/' + pictures[i] + '/method-info.json');

            console.log(data);

            let picture = picture_json;
            picture.name = data.image.name;
            picture.iteration = data.image.iteration;
            picture.spp = data.image.spp;
            picture.total = data.image.total;
            picture.path = 'routes/' + route + "/scenes/" + data.image.name + "/image.png";
            pictures_json.pictures.push(picture);

            if (route == "jeri") {

                let children = {
                    title: data.image.name,
                    image: 'routes/' + route + "/scenes/" + data.image.name + "/image.exr"
                };
                
                let children_SSIM = {
                    title: data.image.name + " SSIM",
                    tonemapGroup: 'other',
                    lossMap: {
                        function: 'SSIM',
                        imageA: 'routes/' + route + "/scenes/" + data.image.name + "/image.exr",
                        imageB: 'routes/' + route + "/scenes/" + 'ref' + "/image.exr"
                    }
                };
                let children_L1 = {
                    title: data.image.name + " L1",
                    tonemapGroup: 'other',
                    lossMap: {
                        function: 'L1',
                        imageA: 'routes/' + route + "/scenes/" + data.image.name + "/image.exr",
                        imageB: 'routes/' + route + "/scenes/" + 'ref' + "/image.exr"
                    }
                };
                let children_MrSE = {
                    title: data.image.name + " MrSE",
                    tonemapGroup: 'other',
                    lossMap: {
                        function: 'MRSE',
                        imageA: 'routes/' + route + "/scenes/" + data.image.name + "/image.exr",
                        imageB: 'routes/' + route + "/scenes/" + 'ref' + "/image.exr"
                    }
                };
                
                jeridata.children.push(children);

                
                jeridata.children.push(children_SSIM);
                jeridata.children.push(children_L1);
                jeridata.children.push(children_MrSE);
                

            }
            jeriData = jeridata;
            fs.writeFileSync('./public/jeriData.json', JSON.stringify(jeridata));
        }

        res.render('content', { title: route, condition: false, path: route, pictures: pictures, compareBoxes: compareBoxes});
        //console.log(route + " wurde aufgerufen!");
    })
}

router.get('/jeriio', function(req, res, next){
    res.render('jeri', { title: 'A View from Jeri.io', routes: files, data: jeriData })
});





generateRoutes();

module.exports = router;
