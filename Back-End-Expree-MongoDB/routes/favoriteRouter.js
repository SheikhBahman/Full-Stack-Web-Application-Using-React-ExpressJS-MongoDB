const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorite');
const cors = require('./cors');
const favoriteRouter = express.Router();

var authenticate = require('../authenticate');
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .populate('user')
            .populate('certificates')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

        Favorites.findOne({ user: req.user._id }, (err, favorite) => {
            if (err) { return next(err); }
            if (!favorite) {

                Favorites.create({ user: req.user._id })
                    .then((favorite) => {
                        for (var certificate = 0; certificate < req.body.certificates.length; certificate++) {
                            favorite.certificates.push(req.body.certificates[certificate]);
                        }
                        favorite.save()
                            .then((favorite) => {
                                Favorites.findById(favorite._id)
                                    .populate('user')
                                    .populate('certificates')
                                    .then((favorite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favorite);
                                    })
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    })
                    .catch((err) => next(err));
            } else {

                for (var certificate = 0; certificate < favorite.certificates.length; certificate++) {
                    if (favorite.certificates.indexOf(req.bodycertificates[certificate]) < 0) {
                        favorite.certificates.push(req.body.certificates[certificate]);
                    }
                }
                favorite.save()
                    .then((favorite) => {
                        Favorites.findById(favorite._id)
                            .populate('user')
                            .populate('certificates')
                            .then((favorite) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorite);
                            })
                    })
                    .catch((err) => {
                        return next(err);
                    });
            }
        });
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on favorites');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOneAndRemove({ "user": req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
//////////////////////////////////////////////////////////////////////////////
favoriteRouter.route('/:certificateId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorites) => {
                if (!favorites) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ "exists": false, "favorites": favorites });
                } else {
                    if (favorites.certificates.indexOf(req.params.certificateId) < 0) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": false, "favorites": favorites });
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({ "exists": true, "favorites": favorites });
                    }
                }

            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {

                if (favorite) {
                    if (favorite.certificates.indexOf(req.params.certificateId) === -1) {
                        favorite.certificates = favorite.certificates.concat([req.body._id]);
                        favorite.save()
                            .then((favorite) => {
                                Favorites.findById(favorite._id)
                                    .populate('user')
                                    .populate('certificates')
                                    .then((favorite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favorite);
                                    })
                            })
                            .catch((err) => {
                                console.log(err.message);
                                return next(err);
                            });
                    }
                } else {
                    Favorites.create({ "user": req.user._id, "certificates": [req.params.certificateId] })
                        .then((favorite) => {
                            console.log('Favorite Created ', favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on favorites' + req.params.certificateId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite) {
                    index = favorite.certificates.indexOf(req.params.certificateId);
                    if (index >= 0) {
                        favorite.certificates.splice(index, 1);
                        favorite.save()
                            .then((favorite) => {
                                Favorites.findById(favorite._id)
                                    .populate('user')
                                    .populate('certificates')
                                    .then((favorite) => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(favorite);
                                    })
                            })
                            .catch((err) => {
                                return next(err);
                            });
                    } else {
                        err = new Error('Certificate ' + req.params.certificateId + ' not found');
                        err.status = 404;
                        return next(err);
                    }
                } else {
                    err = new Error('Favorites not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;