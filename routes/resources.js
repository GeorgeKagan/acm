const express = require('express');
const Resource = require('../models/resource');
const router = express.Router();

router.post('/:name', (req, res, next) => {
    // I put name in the URI since this is the REST way
    const newResource = new Resource({
        name: req.params.name,
    });

    newResource.save().then(resource => res.json('added'));
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    const ip = req.query.ip;
    res.send(`got ${name} ${ip}`);
});

module.exports = router;
