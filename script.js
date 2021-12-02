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

const isNumber = function (num) {

}

const getAsking = function () {
    title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Интерактивные");
    screenPrice = parseInt(prompt("Сколько будет стоить данная работа?", "12000 рублей"));
    adaptive = confirm("Нужен ли адаптив на сайте?");
    // serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
    // servicePrice1 = parseInt(prompt("Сколько это будет стоить?", "3000 рублей"));
    // serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
    // servicePrice2 = parseInt(prompt("Сколько это будет стоить?", "2000 рублей"));
    fullPrice = screenPrice + servicePrice1 + servicePrice2;
    servicePercentPrice = fullPrice - (fullPrice * (rollback/100));
}

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

const getAllServicePrices = function() {
    let sum = 0;

    for (i = 0; i < 2; i++) {

        if (i === 0) {
            serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1")
        }
        else if (i === 1) {
            serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2")
        } 
        sum += parseInt(prompt("Сколько это будет стоить?"))
    }

    return sum;
    // return (servicePrice1 + servicePrice2);
}

function getFullPrice () {
    return (screenPrice + allServicePrices);
}

const getTitle = function(str) {
    str = str.trim().toLowerCase();
    return (str[0].toUpperCase() + str.slice(1));
}

const getServicePercentPrices = function() {
    return (fullPrice - (fullPrice * rollback / 100));
}

const showTypeOf = function(variable) {
    console.log(variable, typeof variable)
}

asking = getAsking();
allServicePrices = getAllServicePrices ();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
rollbackMessage = getRollbackMessage (fullPrice);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices)
console.log(screens.split());
console.log(rollbackMessage);
console.log(servicePercentPrice);
