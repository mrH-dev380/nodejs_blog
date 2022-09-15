const Course = require('../models/Course')

// Chứa tất cả các trang không có slug
class SiteController {

    // [GET] / => home
    index(req, res) {
        // Get values from database
        Course.find({}, function(err, courses) {
            if (!err)
                res.json(courses)
            else
                res.status(400).json({ error: 'Error!' })
        })

        // res.render('home'); // Lấy content file home.hbs thêm vào main.hbs {{{body}}}
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();