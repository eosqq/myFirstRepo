let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 40;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let serviceName1;
let serviceName2;
let servicePrice1;
let servicePrice2;

//Функция валидации
const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}       

//Функция, которая задает вопросы
const asking = function () {
    title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Сложные, Простые, Интерактивные");
    do {
        screenPrice = parseInt(prompt("Сколько будет стоить данная работа?", "12000 рублей"));
    }
    while (!isNumber(screenPrice));
    adaptive = confirm("Нужен ли адаптив на сайте?");
}

//Возвращает размер скидки
const getRollbackMessage = function (price) {
    switch (true) {
    case price >= 30000:
        return ("Даем скидку в 10%");
    case price < 30000 && price >= 15000:
        return ("Даем скидку в 5%");
    case price >= 0 && price < 15000:
        return ("Скидка не предусмотрена");
    case price < 0:
        return ("Что то пошло не так")
    }
}

//Сумма дополнительных услуг
const getAllServicePrices = function() {
    let sum = 0;

    for (i = 0; i < 2; i++) {

        if (i === 0) {
            serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1")
        }
        else if (i === 1) {
            serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2")
        }

        sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
    }
    return sum
    }

//Сумма основной работы + дополнительных услуг
function getFullPrice () {
    return (+screenPrice + allServicePrices);
}

//Регистр названия проекта
const getTitle = function(str) {
    str = str.trim().toLowerCase();
    return (str[0].toUpperCase() + str.slice(1));
}

//Цена с учетом комиссии
const getServicePercentPrices = function() {
    return (fullPrice - (fullPrice * rollback / 100));
}

//Определение типа переменной
const showTypeOf = function(variable) {
    console.log(variable, typeof variable)
}

asking();
allServicePrices = getAllServicePrices ();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices)
console.log(screens.split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
