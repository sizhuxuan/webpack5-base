// index.js
// ES Module
import Header from './components/header.js'
import Sidebar from './components/sidebar.js'
import Content from './components/content.js'

// images

// mini
const sleep = require('./assets/images/icon_sleep.png')

// larger
const png = require('./assets/images/login_bg.png')

const svg = require('./assets/images/常用.svg')

const jpeg = require('./assets/images/jifen_bg.jpeg')

const jpg = require('./assets/images/shuimian.jpg')

const gif = require('./assets/images/pingtu01.gif')

// other
const fileTxt = require('./assets/others/notes.txt')

import './assets/styles/reset.css'

const global = require('./assets/styles/index.scss')

console.log('png: ', png)
console.log('svg: ', svg)
console.log('jpeg: ', jpeg)
console.log('jpg: ', jpg)
console.log('gif: ', gif)
console.log('txt: ', fileTxt)

const dom = document.getElementById('root')
const add = (a, b) => a + b

// 插入一张图片
const img = new Image()
img.src = png // 图片模块 dog1 作为 img 变量的 src 属性值
// img.width = 200
img.classList.add('avatar')
dom.append(img)

// header
new Header(dom)
// side-bar
new Sidebar(dom)
// content
new Content(dom)
