const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'test'
        },
        domain: 'http://localhost:3000',
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost:27017/you360',
        secret: '~!@#$%test^&*()',
    },
};

module.exports = config[env];
