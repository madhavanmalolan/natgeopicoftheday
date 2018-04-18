var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


function getUrl(next){
        request.get('https://www.nationalgeographic.com/photography/photo-of-the-day/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var rePattern = new RegExp(/<meta property="og:image" content="(.*?)"\/>/);
                var arrMatches = body.match(rePattern);
                if(arrMatches.length > 0){
                    next(arrMatches[1])
                    return;
                }
            }
            next("https://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDNfMJP-kmlSBNpuvu1lq679ZbE3_LxDXV35dosDvs98MoqZFMtjwlt4ZA1h8eWfXHyReLruRbchJ0K0Tk9iZp61CKf8ozlGq9wDz1j3cAIOx2EjbxVehCiKwUU0vAcyiSVCxDFeQSgrHMm2tTDHX7u094pHK2zkxAxfZEDupGVjQ5Y/");
         });

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function google_getUrl(next){
        request.get("https://www.gstatic.com/_/boq/_/js/k=boq.PlusAppUi.en.YMl4wpIQLTg.O/ck=boq.PlusAppUi.-d8f1tufvdmt7.L.F4.O/m=syna,synb,XAzchc,sy5d,sy5e,sy5f,syn4,IZT63,sy5l,sy63,sy64,sy65,sy66,sy6q,sy6r,sy5p,sy7p,sy6s,sysq,dodICd,sy5c,synd,syn9,sysr,syne,sync,syss,synf,sysp,Y9atKf,syn3,synm,synn,syst,sysv,sysx,sysy,sysw,PrPYRd,hc6Ubd,sy5k,sy72,sy75,sy6p,sy7d,syzj,sy71,sy7f,syn8,sygl,syng,sysg,WSrdab/am=CNAAGAgAAiCgEAAQ/rt=j/d=0/excm=featuredphotosscreensaverview,_b,_tp/ed=1/rs=AGLTcCN60qFsV-UZWb4JtE14K-58yfSiKQ", function(error, response, body){
           var rePattern = /Lj:"(https:\/\/ssl.gstatic.com\/social\/plusappui\/featuredphotosscreensaver\/items\/.*?\.jpg)"/g;
           var m;
           var photos = []
		do {
		    m = rePattern.exec(body);
		    if (m) {
                       photos.push(m[1]); 
		    }
		} while (m);              
                if(photos.length > 0){
                    next(photos[getRandomInt(0,photos.length-1)]);
                    return;
                }
                next("https://ssl.gstatic.com/social/plusappui/featuredphotosscreensaver/items/3-ed85ffe7b9d87ab615fa30d2d2c23900.jpg");
           
       });
}

router.get('/url', function(req, res, next){
    getUrl((url) =>{
        res.send(url);
    });
});
router.get('/g_url', function(req, res, next){
    google_getUrl((url) =>{
        res.send(url);
    });
});

router.get('/img', function(req, res, next){
    getUrl((url) => {
        res.redirect(url);
    });
});

router.get('/g_img', function(req, res, next){
    google_getUrl((url) => {
        res.redirect(url);
    });
});


router.get('/html', function(req, res, next){
    getUrl((url) => {
        res.render('html', {url:url});
    });
});

router.get('/g_html', function(req, res, next){
    google_getUrl((url) => {
        res.render('g_html', {url:url});
    });
});

router.get('/beta', function(req, res, next){
    getUrl((url) => {
        res.render('beta', {url:url});
    });
});



module.exports = router;
