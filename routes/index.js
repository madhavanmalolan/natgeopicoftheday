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

router.get('/url', function(req, res, next){
    getUrl((url) =>{
        res.send(url);
    });
});

router.get('/img', function(req, res, next){
    getUrl((url) => {
        res.redirect(url);
    });
});

router.get('/html', function(req, res, next){
    getUrl((url) => {
        res.render('html', {url:url});
    });
});

module.exports = router;
