let allServicePrices;
let rollback = 40;
let fullPrice;
let servicePercentPrice;

let title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = parseInt(prompt("Сколько будет стоить данная работа?", "12000 рублей"));
let adaptive = confirm("Нужен ли адаптив на сайте?");
let serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
let servicePrice1 = parseInt(prompt("Сколько это будет стоить?", "3000 рублей"));
let serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
let servicePrice2 = parseInt(prompt("Сколько это будет стоить?", "2000 рублей"));

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
    return (servicePrice1 + servicePrice2);
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

allServicePrices = getAllServicePrices ();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
rollbackMessage = getRollbackMessage(fullPrice);
title = getTitle(title);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens.split(", "));
console.log(rollbackMessage);
console.log(servicePercentPrice);
