var express = require('express');
var router = express.Router();
const db = require('../utils/db')
const hash = require('pbkdf2-password')()

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
router.post('/', function(req, res, next) {
  try {
    const { username, password } = req.body; // 假设请求体中包含用户数据
    let currentSalf, currentHash;
    hash({ password }, function (err, pass, salt, hash) {
      if (err) throw err;
      // store the salt & hash in the "db"
      currentSalf = salt;
      currentHash = hash;

      const sql = 'INSERT INTO users (name, hash, salt) VALUES (?, ?, ?)'; // 使用占位符避免SQL注入
      db.query(sql, [username, currentHash, currentSalf], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          res.status(500).json({ error: 'Error inserting the user into the database.' });
        } else {
          console.log('User inserted with ID:', result.insertId);
          res.status(201).json({ message: 'User added successfully', userId: result.insertId });
        }
      });
    });
  } catch (error) {
    console.error('Error occurred while adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding the user.' });
  }
})

module.exports = router;
