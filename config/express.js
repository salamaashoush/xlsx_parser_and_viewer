const express = require('express');
const glob = require('glob');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const compress = require('compression');
const cors = require('cors');
// var methodOverride = require('method-override');

module.exports = function (app, config) {
    var env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');
    // Enable CORS from client-side
    app.use(cors({origin:'http://localhost:3000'}));
    app.use(express.static(config.root + '/public'));
    app.use(cookieParser());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    const upload=multer({dest: './public/uploads/'});
    const cpUpload = upload.fields([{ name: 'file', maxCount: 1 },{ name: 'image', maxCount: 1 },{ name: 'photo', maxCount: 1 },{ name: 'avatar', maxCount: 1 }])
    app.use(cpUpload);
    app.use(logger('dev'));
    app.use(compress());

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                message: err.message,
                error: err
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render({
            message: err.message,
            error: {},
        });
    });
    return app;
};
