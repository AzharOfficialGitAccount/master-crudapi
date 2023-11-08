const mongoose = require('mongoose');
const config = require('../config/index');
mongoose.Promise = global.Promise;

const connections = {};

function createConnection(mongoUri) {
    if (connections[mongoUri]) {
        return connections[mongoUri];
    }
    const connection = mongoose.createConnection(mongoUri);
    connection.on('connected', () => {
        console.log('Database connection establish successfully"');
    });
    connection.on('error', (err) => {
        console.log(`Database connection has occurred error: ${err}`);
    });
    connection.on('disconnected', () => {
        console.log(`Database Connection to "${mongoUri}" is disconnected`);
    });
    connections[mongoUri] = connection;
    return connection;
}

module.exports = {
    getUserDB: createConnection.bind(null, config.mongodbUserUri),
    connections
};
