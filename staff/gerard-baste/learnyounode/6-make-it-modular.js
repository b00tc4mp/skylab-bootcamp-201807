const fs = require('fs'),
    path = require('path');

module.exports = function (dir, ext, callback) {
    ext = '.' + ext;

    fs.readdir(dir, function (err, data) {
        if (err) return callback(err);

        data = data.filter(function (file) {
            if (path.extname(file) === ext) {
                return true;
            } else {
                return false;
            }
        });

        callback(null, data);
    });
};