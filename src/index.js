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
        helpers: {
            sum: (a, b) => a + b, // Index starts at 1
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'd="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"',
                    desc: 'd="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"',
                    asc: 'd="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" ${icon}/>
                </svg> 
                </a>`
            }
        }
    })
); // App sử dụng template engine là handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // Add component views

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});