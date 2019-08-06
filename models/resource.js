const connection = require("../persistence/connection");

const ResourceSchema = new connection.Schema({
    name: {
        type: String,
        required: true
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