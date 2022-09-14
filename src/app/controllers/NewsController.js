class NewsController {

    // [GET] /news
    index(req, res) {
        console.log(req.query.q) // Query parameters
        res.render('news') // Lấy content file news.hbs thêm vào main.hbs {{{body}}}
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEW DETAIL!!!')
    }
}

module.exports = new NewsController