//Объект appData
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 40,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    //Описание валидации поля ввода
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    //Описание функции основных вопросов
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", " КаЛьКулятор Верстки");
        } while (appData.isNumber(appData.title))
        
        for (let i = 0; i < 2; i++) {
            let name = ''
            let price = 0

            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (appData.isNumber(name))

            do {
                price = prompt("Сколько будет стоить данная работа?", "12000");
            }
            while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price })
        }

        for (let i = 0; i < 2; i++) {
            let name = ''
            let price = 0

                do {
                    name = prompt("Какой дополнительный тип услуги нужен?")
                } while (appData.isNumber(name))
    
                do {
                    price = +prompt('Сколько это будет стоить?', "2000");
                } while (!appData.isNumber(price));

                appData.services[name] = price
            }
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");  
    },

    addPrices: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
            }
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
        
    },

    //Описание функции суммы основной работы + дополнительных услуг
    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },

    //Описание функции регистра названия проекта
    getTitle: function() {
        appData.title = appData.title.trim().toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
    },

    //Описание функции цены с учетом комиссии
    getServicePercentPrices: function() {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * appData.rollback / 100);
    },

    //Описание логов
    logger: function() {
        console.log(appData.fullPrice)
        console.log(appData.servicePercentPrice)
        console.log(appData.screens)
        // for (let key in appData) {
        //     console.log('Свойство/Метод: ' + key + ', Значение: ' + appData[key])
        // }
    },

    //Вызовы функций
    start: function() {
        appData.asking(),
        appData.addPrices(),
        appData.getFullPrice(),
        appData.getServicePercentPrices(),
        appData.getTitle(),
        appData.logger()
    },
}  

appData.start()