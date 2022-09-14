const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine
const app = express()
const port = 3000

const route = require('./routes') // Mặc định lấy file ./routes/index.js

// Mặc định tải trang đứng từ src/public, lấy file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({ extname: '.hbs' })) // App sử dụng template engine là handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views')); // Add component views

route(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})