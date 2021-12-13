//1
const books = document.querySelectorAll('.book')
books[0].before(books[1])
books[2].before(books[4])
books[5].after(books[2])

//2
const imageUrl = "url('/image/you-dont-know-js.jpg')"
document.body.style.background = imageUrl

//3
titleBook4 = books[4].querySelector('a')
titleBook4.textContent = 'Книга 3. this и Прототипы Объектов'

//4
const adv = document.querySelector('.adv')
adv.remove()

//5
listBook0 = books[0].querySelectorAll('li')
listBook0[10].before(listBook0[2])
listBook0[8].after(listBook0[7])
listBook0[4].before(listBook0[6])
listBook0[6].after(listBook0[8])

listBook5 = books[5].querySelectorAll('li')
listBook5[1].after(listBook5[9])
listBook5[4].after(listBook5[2])
listBook5[8].before(listBook5[5])

//6
newList = document.createElement('li')
newList.textContent = 'Глава 8: За пределами ES6'

listBook2 = books[2].querySelectorAll('li')
listBook2[8].after(newList)
