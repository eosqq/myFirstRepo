//Объявление элементов, полученных со страницы
const titleDOM = document.getElementsByTagName('h1') [0]

const handlerItems = document.getElementsByClassName('handler_btn')
const handler_btn_start = handlerItems[0]
const handler_btn_reset = handlerItems[1]

const screenBtn = document.querySelector('.screen-btn')
const percentItems = document.querySelectorAll('.other-items.percent')
const numberItems = document.querySelectorAll('.other-items.number')

const inputTypeRange = document.querySelector('.main-controls__range input[type=range]')
const span = document.querySelector('.main-controls__range span[class=range-value]')

const totalInput = document.getElementsByClassName('total-input')

const total = totalInput[0]
const totalCount = totalInput[1]
const totalCountOther = totalInput[2]
const totalFullCount = totalInput[3]
const totalCountRollback = totalInput[4]
const range = inputTypeRange
const rollback = span

let screens = document.querySelectorAll('.screen')

//Объект appData
const appData = {
    title: '',
    screens: [],
    testmass: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    fullPriceRollback: 0,
    isError: false,

    init: function() {
        appData.addTitle()
        screenBtn.addEventListener('click', appData.addScreenBlock)
        handler_btn_start.addEventListener('click', appData.addCheck)
        range.addEventListener('input', appData.range)
    },

    range: function(event) {
        rollback.textContent = +event.target.value
        appData.rollback = rollback.textContent
        span.textContent = rollback.textContent + '%'
    },

    addCheck: function() {
        appData.isError = false
        screens = document.querySelectorAll('.screen')

        screens.forEach(function(screen) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input[type=text]')

            if (input.value === "" || select.value === "") {
                appData.isError = true
            } else {
                appData.isError = false
            }
        })
        if (!appData.isError) {
            appData.start()
        } else {
            alert ('Заполните пустые поля')
        }
    },

    addTitle: function() {
        document.title = titleDOM.textContent
    },

    start: function() {
            appData.addScreens()
            appData.addServices()
            appData.addPrices()
            appData.showResult()
            appData.logger()
    },

    showResult: function() {
        total.value = appData.screenPrice
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        totalFullCount.value = appData.fullPrice
        totalCountRollback.value = appData.fullPriceRollback
        totalCount.value = appData.screens.reduce((sum, item) => sum + item.count, 0)
    },

    addScreens: function() {
        
        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },
    
    addServices: function() {
        percentItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            const labet = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.servicesPercent[labet.textContent] = +input.value
            }
        })

        numberItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            const labet = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.servicesNumber[labet.textContent] = +input.value
            }
        })
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length - 1].after(cloneScreen)
        screens = document.querySelectorAll('.screen')
    },

    addPrices: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
            }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * appData.servicesPercent[key] / 100
            }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.fullPriceRollback = +appData.fullPrice - (+appData.fullPrice * +appData.rollback / 100);
    },

    //Описание логов
    logger: function() {
        console.log(appData.fullPrice)
        console.log(appData.screens)
        console.log(appData)
    }
}  

appData.init()