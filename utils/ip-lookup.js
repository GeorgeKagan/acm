const geolite2 = require('geolite2');
const maxmind = require('maxmind');
const fs = require('fs');

// Read the db from filesystem once on server start up

const buffer = fs.readFileSync(geolite2.paths.city);
const lookup = new maxmind.Reader(buffer);

module.exports = lookup;