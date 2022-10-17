const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../ulti/mongoose')

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([
                Course.find({}).sortable(req),
                Course.countDocumentsDeleted()
            ])
            .then(([course, deletedCount]) => {
                res.render('me/stored-courses', {
                    course: multipleMongooseToObject(course),
                    deletedCount: deletedCount,
                })
            })
            .catch(next)

        // Xảy ra ko đồng bộ nên dùng promise cho countDocumentsDeleted()
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         deletedCount
        //     })
        //     .catch((error) => {})

        // Course.find({})
        //     .then(course => res.render('me/stored-courses', {
        //         course: multipleMongooseToObject(course)
        //     }))
        //     .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(course => res.render('me/trash-courses', {
                course: multipleMongooseToObject(course)
            }))
            .catch(next)

    }
}

module.exports = new MeController();