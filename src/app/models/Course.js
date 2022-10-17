const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const CourseScheme = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true, slugOn: { updateOne: true } },
}, {
    timestamps: true // createTime-updateTime Course
});

// Custom query helpers
CourseScheme.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({ // this = courseQuery
            // Sort column='' by type=''
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this
}

// Add plugin
mongoose.plugin(slug)
CourseScheme.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Course', CourseScheme);