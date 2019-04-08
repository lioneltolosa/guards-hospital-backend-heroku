var express = require('express');

var app = express();

var Usuario = require('../models/users');

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         ok: true,
//         mensaje: 'Route Working Perfectly'
//     });
// });

app.get('/users', (req, res, next) => {
    
    // res.sendFile(path.resolve(__dirname + '/public/index.html'));

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
});

module.exports = app;