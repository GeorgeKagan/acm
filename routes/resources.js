const express = require('express');
const Resource = require('../models/resource');
const router = express.Router();
const ipRangeCheck = require("ip-range-check");

const DB_ERR_DUPLICATE = 11000;

router.post('/:name', (req, res, next) => {
    // Wasn't sure you wanted this implemented in a more robust way or a simple if would suffice
    // More robust = a conditional rules set, e.g. something that Joi lib can provide, or similar
    if (!req.body.ipRange && !req.body.location) {
        res.status(403).json({error: 'resource must have either ipRange or location'});
    }

    // I put name in the URI since this is the REST way
    const newResource = new Resource({
        name: req.params.name,
        context: req.body.context,
        ipRange: req.body.ipRange,
        location: req.body.location
    });

    newResource.save().then(resource => {
        res.status(201).json(resource)
    }).catch((err) => {
        if (err.code === DB_ERR_DUPLICATE) {
            res.status(409).json({error: 'resource already exists'});
        } else {
            res.status(400).json({error: err.message});
        }
    });
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    const ip = req.query.ip;

    if (!ip) {
        return res.status(400).json({error: 'ip is required'});
    }

    Resource.find({name}).select({'context': 1, 'ipRange': 1, '_id': 0}).exec((err, resource) => {
        if (err) {
            return next(err);
        }
        if (!resource || !resource.length) {
            return res.status(404).json({error: 'resource not found'});
        }
        if (!ipRangeCheck(ip, resource[0].ipRange)) {
            return res.status(403).json({error: 'forbidden'});
        }
        res.json({context: resource[0].context});
    });
});

module.exports = router;
