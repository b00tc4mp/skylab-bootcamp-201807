const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
let filedata = null;
/* GET users listing. */
router.get('/', function (req, res, next) {
    fs.readFile(path.join(process.cwd(), 'public/files/users.json'), (err, data) => {
        if (err)
            throw err;
        filedata = JSON.parse(data);
        console.error(filedata);
        res.json(filedata);
    });
});
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    fs.readFile(path.join(process.cwd(), 'public/files/users.json'), (err, data) => {
        if (err)
            throw err;
        filedata = JSON.parse(data);
        const user = filedata.filter(element => {
            console.error("element", element);
            return element.index.toString() === id;
        });
        res.json(user);
    });
});
module.exports = router;
//# sourceMappingURL=users.js.map