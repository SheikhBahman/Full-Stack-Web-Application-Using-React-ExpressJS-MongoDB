const express = require('express');
const bodyParser = require('body-parser');
const Loggs = require('../models/loggs');
const cors = require('./cors');

const loggRouter = express.Router();
loggRouter.use(bodyParser.json());

loggRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Loggs.find({})
            .then((loggs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(loggs);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        Loggs.remove({})
            .then((resp) => {
                Loggs.find({})
                    .then((loggs) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(loggs);
                    }, (err) => next(err))
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = loggRouter;