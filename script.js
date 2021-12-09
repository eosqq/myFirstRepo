//Объект appData
const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 40,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    serviceName1: '',
    serviceName2: '',

    //Описание валидации поля ввода
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    //Описание функции основных вопросов
    asking: function () {
        appData.title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Сложные, Простые, Интерактивные");
        do {
            appData.screenPrice = parseInt(prompt("Сколько будет стоить данная работа?", "12000 рублей"));
        }
        while (!appData.isNumber(appData.screenPrice));
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    //Описание функции размера скидки
    getRollbackMessage: function () {
        switch (true) {
        case appData.fullPrice >= 30000:
            return ("Даем скидку в 10%");
        case appData.fullPrice < 30000 && appData.fullPrice >= 15000:
            return ("Даем скидку в 5%");
        case appData.fullPrice >= 0 && appData.fullPrice < 15000:
            return ("Скидка не предусмотрена");
        case appData.fullPrice < 0:
            return ("Что то пошло не так")
        }
    },

    //Описание функции суммы дополнительных услуг
    getAllServicePrices: function() {
    let sum = 0;

    for (i = 0; i < 2; i++) {

        if (i === 0) {
            appData.serviceName1 = prompt("Какой дополнительный тип услуги нужен?", "service1")
        }
        else if (i === 1) {
            appData.serviceName2 = prompt("Какой дополнительный тип услуги нужен?", "service2")
        }

        sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?', "2000");
            } while (!appData.isNumber(n));
            return +n;
        })();
    }
    return appData.allServicePrices = sum
    },

    //Описание функции суммы основной работы + дополнительных услуг
    getFullPrice: function() {
        return appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    //Описание функции регистра названия проекта
    getTitle: function() {
        appData.title = appData.title.trim().toLowerCase();
        return appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    },

    //Описание функции цены с учетом комиссии
    getServicePercentPrices: function() {
        return appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * appData.rollback / 100);
    },

    //Описание логов
    logger: function() {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrice)
        for (let key in appData) {
            console.log('Свойство/Метод: ' + key + ', Значение: ' + appData[key])
        }
    },

    //Вызовы функций
    start: function() {
        return appData.asking(),
        appData.getAllServicePrices(),
        appData.getFullPrice(),
        appData.getRollbackMessage(),
        appData.getServicePercentPrices(),
        appData.getTitle(),
        appData.logger()
    },
}  

appData.start()
