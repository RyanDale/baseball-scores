'use strict';

var IndexModel = require('../models/index'),
    request = require('request');

module.exports = function (router) {

    let model = new IndexModel();

    router.get('/', function (req, res) {
        res.render('index.html', model);
    });

    router.get('/game/:eventId', function (req, res, next) {
        let options = {
            url: `https://erikberg.com/mlb/boxscore/${req.params.eventId}.json`,
            headers: {
                'User-Agent': 'BaseballScoresRobot/1.0 (rdale@atlatlsoftware.com)',
                'Authorization': 'Bearer 8d11591d-a588-43b5-9dea-a68fb2b1fc39'
            }
        };

        function callback(error, response, body) {
            res.send(JSON.parse(body));
            return next();
        }

        request(options, callback);
    });

    router.get('/games', function (req, res, next) {
        let options = {
            url: 'https://erikberg.com/mlb/events.json',
            headers: {
                'User-Agent': 'BaseballScoresRobot/1.0 (rdale@atlatlsoftware.com)',
                'Authorization': 'Bearer 8d11591d-a588-43b5-9dea-a68fb2b1fc39'
            },
            qs: {
                date: req.query.date,
                sport: 'mlb'
            },
            useQuerystring: true
        };

        function callback(error, response, body) {
            res.send(JSON.parse(body));
            return next();
        }

        request(options, callback);
    });

};
