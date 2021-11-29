let num = 266219;

let multiplication = eval(num.toString().split('').join('*')); // 1) конвертация из типа Number в String для сплита;
// 2) сплит строчного выражения на отдельные элементы массива; 3) перемножение каждого элемента в массиве друг на друга
let result = (multiplication **= 3).toString(); // возведение в степень и конвертация в String

console.log (result.slice(0,2)); //Вывод в консоль первых 2 цифр полученного числа
