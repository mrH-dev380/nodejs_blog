const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../ulti/mongoose')

// Chứa tất cả các trang không có slug
class SiteController {

    // [GET] / => home
    index(req, res, next) {
        // Get values from database
        // Course.find({}, function(err, courses) {
        //     if (!err)
        //         res.json(courses)
        //     else {
        //         res.status(400).json({ error: 'Error!' })
        //         next(err)
        //     }

        // })

        // Get values from database use Promise
        Course.find({})
            .then(courses => {
                // courses = courses.map(course => course.toObject());
                res.render('home', {
                    courses: multipleMongooseToObject(courses) // Truyền dữ liệu từ DB vào homepag
                })
            })
            .catch(error => next(error))

        // res.render('home'); // Lấy content file home.hbs thêm vào main.hbs {{{body}}}
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();