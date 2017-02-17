const router = require('express').Router();
const Burner = require('../models/burnPeeps');
const bodyParser = require('body-parser').json();

module.exports = router
    .post('/', bodyParser, (req, res, next) => {
        new Burner(req.body).save()
            .then(burner => res.send(burner))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Burner.find()
            .then(burners = res.send(burners))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Burner.findById(req.params.id)
            .lean()
            .then (burner => {
                if(!burner) { 
                    throw {
                        code: 404,
                        error: `burner id ${req.params.id} does not exist`
                    };
                }
                res.send(burner);
            })
            .catch(next);
    });
