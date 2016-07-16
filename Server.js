

var express = require("express");
var Twig = require("twig");
var Reminder = require('reminder');
var push = require('pushover-notifications');


var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var remind = new Reminder();
var planning = require('./planning');
var whichGarbage = planning.whichGarbage();

console.log(process.env);
console.log(process.env['PUSHOVER_USER']);

var push = new push({
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN']
});

router.use(function (req, res, next) {
    //console.log("/" + req.method);
    next();
});

router.get("/", function (req, res) {
    res.render('index.twig', {
        name: whichGarbage.name,
        image: whichGarbage.image,
        color: whichGarbage.color
    });
});


app.use("/", router);
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 5000, function () {
    console.log("Server HTTP démarré");
});


remind.at('09:00', function (date) {
    if (whichGarbage != '') {
        if (whichGarbage.color != '') {
            var displayName = 'Bac à sortir pour demain : ' + whichGarbage.name + '(' + whichGarbage.color + ')';
        }
        else {
            displayName = whichGarbage.name;
        }

        console.log(whichGarbage.name);

        var msg = {
            message: whichGarbage.name,   // required
            title: "Hey",
            sound: 'bike',
            device: 'lg-d331',
            priority: 1
        };


        push.send(msg, function (err, result) {
            if (err) {
                throw err;
            }

            console.log(result);
        });

    }
});
