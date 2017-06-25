var errormapDao = require('../dao/errormapDao')

exports.mapErrorCodeToStatus = (errorCode, callback) => {
        try {
            errormapDao.findErrormapByErrorCode(errorCode,callback)               
        } catch (error) {
            reject(Error(error))
        }
}