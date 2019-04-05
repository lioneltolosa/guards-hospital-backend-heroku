var express = require('express');

var app = express();

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         ok: true,
//         mensaje: 'Route Working Perfectly'
//     });
// });

var Usuario = require('../models/users');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', (req, res, next) => {
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