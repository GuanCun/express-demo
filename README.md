# my-express

## 描述

这是一个简单的 Express 服务器，提供静态 HTML 文件。

## 安装

1. 克隆该仓库
2. 运行 `npm install`
3. 在项目的根目录下创建一个 `.env` 文件。在新行中以 `名称=值` 的形式添加特定于环境的变量。例如：

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的密码
DB_NAME=demo
```

4. 运行 `DEBUG=myapp:* npm start`

## 使用

在你的浏览器中打开 `http://localhost:3000`。

服务器将使用你的 `.env` 文件中的环境变量，确保你已正确设置它们。

## 功能

### 登录/登出

1. 提交用户名和密码： `{ name: 'guan', password: 'xxx' }`
2. 数据库查找该用户名，利用'pbkdf2-password'库，通过密码 + 数据库 salf 重新生成 hash 并与数据库的 hash 进行比对
3. 验证成功后发放 token

### MySQL 数据库增删改查

- 使用了 `mysql2` 库
- 使用 `dotenv` 管理数据库连接信息

### 注册用户

1. 提交用户名和密码： `{ name: 'guan', password: 'xxx' }`
2. 将密码通过'pbkdf2-password'库转成 salt 和 hash，并且跟着名称保存到数据库：
   ```json
   {
     "name": "guan",
     "salt": "your_salt",
     "hash": "your_hash"
   }
   ```

## 开发
- [新增页面](./CREATED_PAGE.md)

## 注意事项

- 确保 `.env` 文件中的数据库连接信息是正确的。
- 保证数据库已经创建，并且在 `.env` 文件中设置的 `DB_NAME` 是存在的。
