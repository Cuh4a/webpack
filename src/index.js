import Post from "./post" //импортируем Post класс
import "./styles/styles.css"
import json from "./assets/json"
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"
import WebpackLogo from "./assets/webpack-logo.png"

const post = new Post('Webpack Post title', WebpackLogo);

console.log('Post to String:', post.toSttring());
// console.log("JSON:", json);
// console.log("XML:", xml);
// console.log("CSV:", csv);