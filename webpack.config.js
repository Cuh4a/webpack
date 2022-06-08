const path = require("path");
const HTMLWebpackPugin = require("html-webpack-plugin"); //подключение webpack plugin HTML
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //подключение webpack plugin clean
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');

// const { config } = require("process");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

console.log("Is DEV:", isDev);

const optimizaion = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config;
}


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development", //'это означает что мы все собираем в режиме разработки
    entry: { //две точки входа 
        // 1 точка входа:
        main: "./index.js", //здесь подключаем главный файл js
        // 2 точка входа:
        analytics: "./analytics.js"
    },
    output: {
        filename: "[name].[contenthash].js", //общий файл в котором будут все файлы JS
        path: path.resolve(__dirname, "dist") //путь куда будут сложены файлы
    },
    resolve: {
        extensions: [".js", ".json", ".png", ".css"], //сюда вносим расширение которое не хотим писать в import подключении
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src")
        }
    },
    optimization: optimizaion(),
    devServer: {
        port: 4200,

    },
    plugins: [ //массив с плагинами
        new HTMLWebpackPugin({
            template: "./index.html",
            inject: 'body',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css", //общий файл в котором будут все файлы css
        })
    ],
    module: {
        rules: [{
                test: /\.css$/, //для import с расширением css
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: path.resolve(__dirname, 'dist')
                    },
                }, 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            },
            {
                test: /\.less$/, //для import с расширением less
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: path.resolve(__dirname, 'dist')
                    },
                }, 'css-loader']
            }
        ]
    }
}