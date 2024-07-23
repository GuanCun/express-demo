# 如何开发新页面

## 假设现在要新建一个 register 页面

1. 在 views 创建 register.ejs
2. 在 app.js `const registerRouter = require('./routes/register');`
3. 在 routes 创建 register.js

```js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('register');
});

module.exports = router
```

4. 在 app.js `app.use('/register', registerRouter);`
