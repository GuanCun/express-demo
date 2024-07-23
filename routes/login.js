const express = require('express');
const hashFn = require('pbkdf2-password')()
const router = express.Router();
const db = require('../utils/db')

/* GET home page. */
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Express' });
// });

router.get('/', function(req, res){
  res.render('login');
});

router.post('/', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  // 根据名称查询用户信息
  db.query('select * from users where name = ?', [name], (err, users) => {
    console.log(users)
    if (users.length === 0) {
      console.log('no such user:', name)
      return fn(null, null)
    }

    // query the db for the given username
    const dbUser = users[0]
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hashFn({ password: pass, salt: dbUser.salt }, function (err, pass, salt, hash) {
      if (err) return fn(err);
      if (hash === dbUser.hash) return fn(null, dbUser)
      fn(null, null)
    });
  })
}

module.exports = router;
