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
        this.addTitle()
        screenBtn.addEventListener('click', this.addScreenBlock.bind(this))
        handler_btn_start.addEventListener('click', this.addCheck.bind(this))
        range.addEventListener('input', this.range.bind(this))
    },

    range: function(event) {
        rollback.textContent = +event.target.value
        this.rollback = rollback.textContent
        span.textContent = rollback.textContent + '%'
    },

    addCheck: function() {
        appData.isError = false
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input[type=text]')

            if (input.value === "" || select.value === "") {
                console.log(this)
                appData.isError = true
            } else {
                appData.isError = false
            }
        })
        if (!appData.isError) {
            appData.start() // !!!
        } else {
            alert ('Заполните пустые поля')
        }
        console.dir(this);
    },

    addTitle: function() {
        document.title = titleDOM.textContent
    },

    start: function() {
            this.addScreens()
            this.addServices()
            this.addPrices()
            this.showResult()
            this.reset()
            this.logger()
    },

    reset: function() {
        handler_btn_start.style.display = 'none'
        handler_btn_reset.style.display = 'block'
        handler_btn_reset.textContent = 'Сброс'
        handler_btn_reset.addEventListener('click', appData.addClear)
    },

    addClear: function() {

        screens.forEach(function(screen) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            select.options.selectedIndex = 0
            select.disabled = false
            input.value = ''
            input.disabled = false
        })
        appData.screens.splice(0, appData.screens.length)

        percentItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
            check.disabled = false
        })
        delete appData.servicesPercent

        numberItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
            check.disabled = false
        })
        delete appData.servicesNumber

        range.value = '0'
        span.textContent = 0
        rollback.textContent = +span.textContent + '%'

        //appData.screenPrice = 0
        //appData.servicePricesPercent = 0
        //appData.servicePricesNumber = 0
        //appData.fullPrice = 0
        //appData.fullPriceRollback = 0
        //total.value = 0
        //totalCountOther.value = 0
        //totalFullCount.value = 0
        //totalCountRollback.value = 0
        //totalCount.value = 0

        handler_btn_start.style.display = 'block'
        handler_btn_reset.style.display = 'none'
        appData.init()
    },

    showResult: function() {
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        totalFullCount.value = this.fullPrice
        totalCountRollback.value = this.fullPriceRollback
        totalCount.value = this.screens.reduce((sum, item) => sum + item.count, 0)
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
            console.log(appData.screens);
            select.disabled = true
            input.disabled = true
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
            check.disabled = true
            console.log(appData.servicesPercent); 
        })

        numberItems.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]')
            const labet = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.servicesNumber[labet.textContent] = +input.value
            }
            check.disabled = true
        })
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length - 1].after(cloneScreen)
        screens = document.querySelectorAll('.screen')
        console.log(this);
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