const express = require('express');
var router = express.Router();

/* GET cats . */
router.get('/', function(req, res, next) {
  res.send('cats!');
});

module.exports = router;
// export default router;
