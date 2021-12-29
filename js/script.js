class First {
    constructor() {

    }
    hello() {
        console.log(`Привет я метод родителя!`);
    }
}

class Second extends First {

    secondHello() {
        super.hello()
        console.log(`А я наследуемый метод!`);
    }
}

const third = new Second ()
third.secondHello()

