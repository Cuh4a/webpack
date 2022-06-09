const path = require("path");
const HTMLWebpackPugin = require("html-webpack-plugin"); //подключение webpack plugin HTML
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin"); //подключение webpack plugin clean
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');


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

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: path.resolve(__dirname, 'dist')
        },
    }, 'css-loader']

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development", //'это означает что мы все собираем в режиме разработки
    entry: { //две точки входа 
        // 1 точка входа:
        main: ["@babel/polyfill", "./index.js"], //здесь подключаем главный файл js
        // 2 точка входа:
        analytics: "./analytics.ts"
    },
    output: {
        filename: fileName('js'), //общий файл в котором будут все файлы JS
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
            filename: fileName("css"), //общий файл в котором будут все файлы css
        })
    ],
    module: {
        rules: [{
                test: /\.css$/, //для import с расширением css
                use: cssLoaders(),
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
                use: cssLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/, //для import с расширением Sass
                use: cssLoaders("sass-loader"),
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-typescript'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
}