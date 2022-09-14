class SiteController {

    // Chứa tất cả các trang không có slug

    // [GET] / => home
    index(req, res) {
        res.render('home') // Lấy content file home.hbs thêm vào main.hbs {{{body}}}
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController