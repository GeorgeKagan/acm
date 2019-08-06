const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.send('post');
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  const ip = req.query.ip;
  res.send(`got ${name} ${ip}`);
});

module.exports = router;
