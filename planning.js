var moment = require('moment');
var momentFerie = require('moment-ferie-fr');

var daysOrduresMenageres = ['Thursday', 'Saturday'];
var daysPlastique = ['Thursday'];
var daysCarton = ['Thursday'];

var now = moment();
var currentDay = now.format('dddd');

var tomorrow = moment().add(1, 'days');
var tomorrowDay = tomorrow.format('dddd');

var yesterday = moment().subtract(1, 'days');
var previousDay = yesterday.format('dddd');

var week = now.format('ww');


module.exports.whichGarbage = function () {

    var garbage = {};

    //Si demain est compris dans les jours pour OM - ou - si aujourd'hui est ferié et qu'aujourd'hui est compris dans les jours pour OM
    if (daysOrduresMenageres.indexOf(tomorrowDay) != -1 || (now.isFerie() && daysOrduresMenageres.indexOf(currentDay) != -1 )) {
        garbage = {
            name: 'Ordures Ménagères',
            color: 'Gris',
            image: '/images/bac_gris.png'
        }
    }
    else if (( daysPlastique.indexOf(tomorrowDay) != -1 || (now.isFerie() && daysPlastique.indexOf(currentDay) != -1 ) ) && isOdd(week)) {
        garbage = {
            name: 'Plastiques',
            color: 'Jaune',
            image: '/images/bac_jaune.png'
        }
    }
    else if ((daysCarton.indexOf(tomorrowDay) != -1 || (now.isFerie() && daysCarton.indexOf(currentDay) != -1 )) && isEven(week)) {
        garbage = {
            name: 'Cartons',
            color: 'Bleu',
            image: '/images/bac_bleu.png'
        }
    }
    //Si Aujourd'hui est dimanche et qu'hier était ferié, alerter, pour Lundi
    else if (currentDay == 'Sunday' && yesterday.isFerie()) {

        if (daysOrduresMenageres.indexOf(previousDay) != -1) {
            garbage = {
                name: 'Ordures Ménagères',
                color: 'Gris',
                image: '/images/bac_gris.png'
            }
        }

        if (daysPlastique.indexOf(previousDay) != -1) {
            garbage = {
                name: 'Plastiques',
                color: 'Jaune',
                image: '/images/bac_jaune.png'
            }
        }

        if (daysCarton.indexOf(previousDay) != -1) {
            garbage = {
                name: 'Cartons',
                color: 'Bleu',
                image: '/images/bac_bleu.png'
            }
        }
    }
    else {
        garbage = {
            name: 'Aucun bac à sortir ! Dormez tranquille !',
            image: '/images/zen.png'
        }
    }

    return garbage;
}


function isEven(n) {
    return n == parseFloat(n) && !(n % 2);
}

function isOdd(n) {
    return n == parseFloat(n) && !!(n % 2);
}
