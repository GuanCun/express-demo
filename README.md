# my-express

## 描述

这是一个简单的 express 服务器，提供静态 html 文件。

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

## 许可证

MIT
