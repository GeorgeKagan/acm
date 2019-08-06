const express = require('express');
const Resource = require('../models/resource');
const router = express.Router();

router.post('/', (req, res, next) => {
  const newResource = new Resource({
    name: req.body.name
  });

  newResource.save().then(resource => res.json('added'));
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  const ip = req.query.ip;
  res.send(`got ${name} ${ip}`);
});

module.exports = router;
