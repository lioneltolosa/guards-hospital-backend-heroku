var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Imports Routes
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var app = express();

const port = process.env.PORT || 3000;

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/usuariosss', function(req, res) {
//     res.json('get Usuario LOCAL!!!');
// });

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/guardsDB', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

// Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var Usuario = require('./models/users');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/users', (req, res, next) => {
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

// ==========================================
// Crear un nuevo usuario
// ==========================================
// app.post('/users', (req, res) => {

//     var body = req.body;

//     var usuario = new Usuario({
//         nombre: body.nombre,
//         email: body.email,
//         password: bcrypt.hashSync(body.password, 10),
//         img: body.img,
//         role: body.role
//     });

//     usuario.save((err, usuarioGuardado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'Error al crear usuario',
//                 errors: err
//             });
//         }

//         res.status(201).json({
//             ok: true,
//             usuario: usuarioGuardado,
//             usuariotoken: req.usuario
//         });
//     });
// });


module.exports = app;
