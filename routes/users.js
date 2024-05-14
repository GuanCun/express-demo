var express = require('express');
var router = express.Router();
const db = require('../utils/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  db.query('select * from users', (err, users) => {
    console.log(users)
    if (err) throw err
    res.json(users)
  })
  // res.send('respond with a resource');
});

module.exports = router;
