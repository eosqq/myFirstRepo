//Объявление элементов, полученных со страницы
const titleDOM = document.getElementsByTagName('h1') [0]

const handlerItems = document.getElementsByClassName('handler_btn')
const handler_btn_start = handlerItems[0]
const handler_btn_reset = handlerItems[1]

const screenBtn = document.querySelector('.screen-btn')
const percentItems = document.querySelectorAll('.other-items.percent')
const numberItems = document.querySelectorAll('.other-items.number')

const range = document.querySelector('.main-controls__range input[type=range]')
const rollback = document.querySelector('.main-controls__range span[class=range-value]')
console.log(range.value);

const totalInput = document.getElementsByClassName('total-input')

const total = totalInput[0]
const totalCount = totalInput[1]
const totalCountOther = totalInput[2]
const totalFullCount = totalInput[3]
const totalCountRollback = totalInput[4]

let screens = document.querySelectorAll('.screen')

//Объект appData
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollbacks: 0,
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
        this.addCheck.bind(this)
        handler_btn_start.addEventListener('click', () => this.start())
        range.addEventListener('input', () => this.getRange())
        handler_btn_reset.addEventListener('click', () => this.reset())
    },

    getRange: function() {
        console.log(this);
        this.rollbacks = +range.value
        rollback.textContent = +range.value + '%'
    },

    addCheck: function() {
        this.isError = false
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input[type=text]')

            if (input.value === "" || select.textContent === "") {
                this.isError = true
            } else {
                this.isError = false
            }
        })
        return this.isError
    },

    addTitle: function() {
        document.title = titleDOM.textContent
    },

    start: function() {
        if (!this.isError) {
            this.addScreens()
            this.addServices()
            this.addPrices()
            this.showResult()
            this.changeBtn()
            this.logger()
        } else {
            alert ('Заполните пустые поля')
        }     
    },

    changeBtn: function () {
        if (handler_btn_reset.style.display === 'none') {
            handler_btn_start.style.display = 'none'
            handler_btn_reset.style.display = 'block'
        } else if (handler_btn_start.style.display === 'none') {
            handler_btn_start.style.display = 'block'
            handler_btn_reset.style.display = 'none'
        }
    },

    reset: function() {
        this.changeBtn()
        console.log(this);

        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            select.options.selectedIndex = 0
            select.disabled = false
            input.value = ''
            input.disabled = false
            console.log(select);
        })
        
        this.screens.splice(0, this.screens.length)

        percentItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
            check.disabled = false
        })
        delete this.servicesPercent

        numberItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            check.checked = false
            check.disabled = false
        })
        delete this.servicesNumber

        cloneScreen = screens[0].cloneNode(false)
        range.value = '0'
        rollback.textContent = +range.value + '%'

        this.screenPrice = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.fullPrice = 0
        this.fullPriceRollback = 0
        total.value = 0
        totalCountOther.value = 0
        totalFullCount.value = 0
        totalCountRollback.value = 0
        totalCount.value = 0
    },

    showResult: function() {
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        totalFullCount.value = this.fullPrice
        totalCountRollback.value = this.fullPriceRollback
        totalCount.value = this.screens.reduce((sum, item) => sum + item.count, 0)
    },

    addScreens: function() {
        
        screens.forEach((screen, index) => {
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
        percentItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const labet = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.servicesPercent[labet.textContent] = +input.value
            }
            check.disabled = true
            console.log(this.servicesPercent); 
        })

        numberItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const labet = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.servicesNumber[labet.textContent] = +input.value
            }
            check.disabled = true
        })
    },

    addScreenBlock: function() {
        if (handler_btn_reset.style.display = 'none') {
            const cloneScreen = screens[0].cloneNode(true)
            screens[screens.length - 1].after(cloneScreen)
            screens = document.querySelectorAll('.screen')

        } else if (handler_btn_start.style.display = 'none') {
            screens[0].cloneNode(false)
        }
    },

    addPrices: function() {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
            }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * this.servicesPercent[key] / 100
            }

            this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
            this.fullPriceRollback = +this.fullPrice - (+this.fullPrice * +this.rollbacks / 100);
    },

    //Описание логов
    logger: function() {
        console.log(this.fullPrice)
        console.log(this.screens)
        console.log(this)
    }
}  

appData.init()