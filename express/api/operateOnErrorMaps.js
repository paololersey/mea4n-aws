var router = require('express').Router()
var errormapDao = require('../dao/errormapDao')


// get all ErrorMaps
router.get('/api/getErrorMaps',
    function (req, res, next) {
        errormapDao.findAllErrormaps((err, errorMaps) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(errorMaps)
        });
    });

router.get('/api/geterrorMapsByErrorCode/B2',
    function (req, res, next) {
        errormapDao.findErrormapByErrorCode("B2", (err, errorMap) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(errorMap)
        });
    });


module.exports = router