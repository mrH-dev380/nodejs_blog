module.exports = function sortMiddleware(req, res, next) {

    // res.locals: request path name, authenticated user, user settings, and so on to templates rendered
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type
        // res.locals._sort.column = req.query.column

        Object.assign(res.locals._sort, {
            enabled: req.query.enabled,
            type: req.query.type,
            column: req.query.column,
        })
    }

    next()
}