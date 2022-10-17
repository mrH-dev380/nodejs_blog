const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override')
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middleware/sortMiddleware')

const route = require('./routes'); // Mặc định lấy file ./routes/index.js
const db = require('./config/db'); // Connect to database

db.connect()

// Mặc định tải trang đứng từ src/public, lấy file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'))

// Custom middleware
app.use(SortMiddleware)

function bacBaoVe(req, res, next) {
    if (['vethuong, vevip'].includes(req.query.ve)) {
        req.face = 'Gach gach gach'
        return next()
    }

    res.statuses(403).json({
        message: 'Access denied'
    })
}

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    })
); // App sử dụng template engine là handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // Add component views

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});