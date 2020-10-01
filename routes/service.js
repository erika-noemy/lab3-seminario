var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msn: "Hola mundo"
    });
});

router.post('/test', function(req, res, next) {
    req.body["msn"] = "por el servidor"
    var data = req.body
    res.status(200).json(data);
});

router.post('/divisas', function(req, res, next) {
    var body=req.body;
    let moneda =["CAD","HKD","ISK","PHP","DKK","HUF","CZK","GBP","RON","SEK","IDR","INR","BRL","RUB","HRK","JPY","THB","CHF","EUR","MYR","BGN","TRY","CNY","NOK","NZD","ZAR","USD","MXN","SGD","AUD","ILS","KRW","PLN","BO"];
    let cambio = [1.3256384622,7.8401345088, 124.6932654731 , 52.1294192493, 6.7855130419,304.6169226575 , 23.5135872035, 0.8011724075,4.3155503045 , 9.7030809779,14112.4965918386 ,70.9474688721 ,4.1587748796 ,63.6425520313,6.7290738889,107.6524584204,30.5643915296,0.988639462,0.9088430428,4.1814959556 ,1.7775152231,5.6850858857,7.1070617104,9.0179950922,1.583931655 ,14.868581296 ,1 ,19.4398800327, 1.3764427883 ,1.471326002 ,3.5040443515 ,1193.9107516132 ,3.9819140234 ,6.96];
    //console.log(cambio[0]*2);
    let indiceMO=0;
    for(let i=0; i<moneda.length ; i++){
        if(body.m_original == moneda[i]){
            indiceMO= i;
        }
    }
    console.log(indiceMO)
    let indiceMC=0
    for(let i=0; i<moneda.length ; i++){
        if(body.m_cambio == moneda[i]){
            indiceMC= i;
        }
    }
    console.log(indiceMC)
    
    let solucion = (body.cantidad * cambio[indiceMC])/cambio[indiceMO]
    res.status(200).json({"msn" :"el cambio es " + solucion });
});

router.post('/interes', function (req, res, next) {
    var body = req.body;
    let interes = (body.interes/100) / 12 ; //pocentaje por cada mes
    let tiempo = body.tiempo * 12 ; //conversion de años a meses
    let respuesta = (body.monto * interes * Math.pow(1+ interes , tiempo )) /( Math.pow(1+interes , tiempo) -1 );
    res.status(200).json({"msn" :"el pago que debe hacer mensualmente para terminar de pagar es " + respuesta });
 });
module.exports = router;