import * as $ from "jquery" // подключение библиотеки jquery
import Post from "@models/post" //импортируем Post класс
import "./styles/styles.css"
import "./styles/less.less"
import "./styles/scss.scss"
import json from "./assets/json"
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"
import WebpackLogo from "@/assets/webpack-logo"
import "./babel"

const post = new Post('Webpack Post title', WebpackLogo);

$("pre").addClass("code").html(post.toSttring())

console.log('Post to String:', post.toSttring());

const app = document.getElementById('app');

const createDivPhoto = () => {
   const div = document.createElement('div');
    div.classList.add('logo-1');
   app.append(div);
}

createDivPhoto()

// console.log("JSON:", json);
// console.log("XML:", xml);
// console.log("CSV:", csv);