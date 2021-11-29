let title = 'Калькулятор верстки';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 120;
let rollback = 40;
let fullPrice = 250;
let adaptive = true;

console.log (typeof title);
console.log (typeof fullPrice);
console.log (typeof adaptive);
console.log (screens.length)
console.log ('Стоимость верстки экранов' + ' ' + screenPrice + ' ' + 'рублей/ долларов/гривен/юани')
console.log ('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей/ долларов/гривен/юани')
console.log (screens.toLowerCase().split(", "))
console.log (fullPrice * (rollback/100))
