const btn = document.querySelector('#btn')
let square = document.querySelector('#square')
const text = document.querySelector('input[type=text]')
const e_btn = document.querySelector('#e_btn').style.display = 'none'
const range = document.querySelector('input[type=range]')
const circle = document.querySelector('#circle')
let widthCircle = document.querySelector('#circle')
let heightCircle = document.querySelector('#circle')
let newColor;
let sizeCircle;

const getText = function(event) {
    newColor = event.target.value
}
text.addEventListener('input', getText)

const changeColor = function() {
    square.style.backgroundColor = newColor
}
btn.addEventListener('click', changeColor)

const rangeValue = function (event) {
    sizeCircle = event.target.value + '%'
}
range.addEventListener('input', rangeValue)

const changeSize = function() {
    widthCircle.style.width = sizeCircle
    heightCircle.style.height = sizeCircle
}
range.addEventListener('input', changeSize)
