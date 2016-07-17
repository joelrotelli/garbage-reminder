var express = require("express");
var Reminder = require('reminder');
var push = require('pushover-notifications');
var planning = require('./planning');

var app = express();
var router = express.Router();
var remind = new Reminder();
var whichGarbage = planning.whichGarbage();

var pusher = new push({
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


remind.at('20:00', function () {

    //Push alert only if we have a color)
    if (whichGarbage.color != '') {
        var msg = {
            message: whichGarbage.name,   // required
            title: "Hey",
            sound: 'bike',
            device: 'lg-d331',
            priority: 1
        };

        pusher.send(msg, function (error, result) {
            if (error) {
                throw error;
            }
            console.log(result);
        });

    }
});
