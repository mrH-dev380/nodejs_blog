const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine
const app = express()
const port = 3000

// Mặc định tải trang đứng từ src/public, lấy file tĩnh
app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({ extname: '.hbs' })) // App sử dụng template engine là handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views')); // Add component views

app.get('/', (req, res) => {
    res.render('home') // Lấy content file home.hbs thêm vào main.hbs {{{body}}}
})

app.get('/news', (req, res) => {
    res.render('news')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})