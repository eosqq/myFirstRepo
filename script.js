let rollback = 40; // с урока №2

let title = prompt("Как называется ваш проект?", "Калькулятор верстки");
let screens = prompt("Какие типы экранов нужно разработать?", "Интерактивные");
let screenPrice = parseInt(prompt("Сколько будет стоить данная работа?", "12000 рублей"));
let adaptive = confirm("Нужен ли адаптив на сайте?");
let serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
let servicePrice1 = parseInt(prompt("Сколько это будет стоить?", "3000 рублей"));
let serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
let servicePrice2 = parseInt(prompt("Сколько это будет стоить?", "2000 рублей"));

let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback/100));
console.log(servicePercentPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log("Даем скидку в 10%");
        break;
    case fullPrice < 30000 && fullPrice >= 15000:
        console.log("Даем скидку в 5%");
        break;
    case fullPrice >= 0 && fullPrice < 15000:
        console.log("Скидка не предусмотрена");
        break;
    case fullPrice < 0:
        console.log("Что то пошло не так")
        break;
}

