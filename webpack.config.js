const path = require("path");

module.exports = {
    mode: "development", //'это означает что мы все собираем в режиме разработки
    entry: { //две точки входа 
        // 1 точка входа:
        main: "./src/index.js", //здесь подключаем главный файл js
        // 2 точка входа:
        analytics: "./src/analytics.js"
    },
    output: {
        filename: "[name].[contenthash].js",//общий файл в котором будут все файлы JS
        path: path.resolve(__dirname, "dist")   //путь куда будут сложены файлы
    }
}