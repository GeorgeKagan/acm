const connection = require("../persistence/connection");

const ResourceSchema = new connection.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        dropDups: true,
        match : [
            new RegExp('^[a-z0-9]+$', 'i'),
            'Name must be alphanumeric'
        ],
    },
    context: {
        type: String,
        required: true
    },
    ipRange: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        required: false
    }
});

Resource = connection.model('resource', ResourceSchema);

module.exports = Resource;