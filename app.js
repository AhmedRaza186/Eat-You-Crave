function openCart() {
  const sidebar = document.getElementById('cart-sidebar')
  sidebar.style.right = '0'
  const overlay = document.getElementById('overlay')
  overlay.style.display = 'block'
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar')
  sidebar.style.right = '-100%'
  const overlay = document.getElementById('overlay')
  setTimeout(() => overlay.style.display = 'none', 200)
}

let subArr = []

function addToCart(btn) {
  let item = btn.closest('.foodItem')
  let img = item.querySelector('.img img').src
  let title = item.querySelector('.titlePrice h3').innerText
  let description = item.querySelector('.description').innerText
  let price = item.querySelector('.titlePrice p').innerText

  let sidebarItem = document.createElement('div')
  sidebarItem.setAttribute('class', 'sidebar-item')
  sidebarItem.innerHTML = `
    <img src="${img}" alt="">
    <div class="sidebar-item-txt">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <div class="sidebar-price-dlt">
      <p>${price}</p>
      <button onclick="removeFromCart(this)">Remove From Cart</button>
    </div>
  `
  document.querySelector('.sidebar-main').appendChild(sidebarItem)

  let priceNum = Number(price.replace('Rs', ''))
  subArr.push(priceNum)

  updateTotals()
}

function removeFromCart(btn) {
  let item = btn.closest('.sidebar-item')
  let price = item.children[2].firstElementChild.innerText;
  let priceNum = Number(price.replace('Rs', ''))
  item.remove()
  let i = subArr.indexOf(priceNum)
  if (i !== -1) {
    subArr.splice(i, 1)
  }

  updateTotals()
}

function updateTotals() {
  let subTotal = subArr.reduce(function (a, b) {
    return a + b
  }, 0)
  subTotal = Number(subTotal.toFixed(2))

  let tax = Math.floor(subTotal / 7)
  let total = Number((subTotal + tax).toFixed(2))

  document.getElementById('subtotal').lastElementChild.innerText = `${subTotal}Rs`
  document.getElementById('tax').lastElementChild.innerText = `${tax}Rs`
  document.getElementById('total').lastElementChild.innerText = `${total}Rs`
}


let btnsArr = ['All', 'Breakfast', 'Lunch', 'Shakes']
let btns = btnsArr.map((btn) => {
  if (btn == 'All') {
    return `<button onclick="allItems()">${btn}</button>`
  }
  else {
    return `<button onclick="menuSelection('${btn}')">${btn}</button>`
  }
})
document.querySelector('.select-btns').innerHTML = btns.join('')


let menu = [
  {
    img: './assets/biryani.png',
    title: 'Chicken Biryani',
    price: '250Rs',
    description: 'Aromatic basmati rice layered with tender chicken, slow-cooked in rich spices and saffron. Every bite bursts with flavor, warmth, and a touch of tradition.',
    category: 'lunch',
    range: '150 - 299Rs'

  },
  {
    img: './assets/puloa.png',
    title: 'Chicken puloa',
    price: '250Rs',
    description: 'Long-grain rice simmered in a rich chicken broth with a delicate blend of spices, giving it a soothing aroma and a royal, melt-in-mouth taste.',
    category: 'lunch',
    range: '150 - 299Rs'

  },
  {
    img: './assets/mandhi.avif',
    title: 'Chicken Mandhi',
    price: '600Rs',
    description: 'Juicy, spiced chicken layered on golden basmati rice infused with saffron and traditional Arabian flavors — a rich and authentic Mandi experience you’ll crave again and again..',
    category: 'lunch',
    range: '500RS+'

  },
  {
    img: './assets/korma.png',
    title: 'Chicken Korma',
    price: '300Rs',
    description: 'Tender chicken cooked in a creamy, spiced yogurt gravy with a hint of nuts and aromatic herbs. A perfect blend of richness and tradition in every bite.',
    category: 'lunch',
    range: '300 - 499Rs'

  },
  {
    img: './assets/karahi.png',
    title: 'Chicken Karahi',
    price: '450Rs',
    description: 'Spicy, smoky, and full of flavor — our Chicken Karahi hits that perfect balance between heat and taste',
    category: 'lunch',
    range: '300 - 499Rs'

  },
  {
    img: './assets/Naan.png',
    title: 'Garlic Naan',
    price: '80Rs',
    description: 'Soft, fluffy naan brushed with butter and sprinkled with freshly chopped garlic — baked to perfection for that irresistible aroma and flavor.',
    category: 'lunch',
    range: '0 - 149Rs'

  },
  {
    img: './assets/halwapuri.png',
    title: 'Halwa Puri',
    price: '180Rs',
    description: 'Golden, crispy puris served with sweet suji halwa and spicy chana curry — the perfect blend of flavors to start your morning with pure desi happiness.',
    category: 'breakfast',
    range: '150 - 299Rs'
  },
  {
    img: './assets/paratha.png',
    title: 'Paratha',
    price: '50Rs',
    description: 'Crispy, multi-layered paratha cooked with ghee until golden brown — soft inside, crunchy outside, and packed with buttery flavor.',
    category: 'breakfast',
    range: '0 - 149Rs'
  },
  {
    img: './assets/strawberryshake.png',
    title: 'Strawberry Shake',
    price: '250Rs',
    description: 'Fresh, juicy strawberries bursting with natural sweetness and vibrant flavor — a refreshing treat for any time of the day.',
    category: 'shakes',
    range: '150 - 299Rs'
  },
  {
    img: './assets/mangoshake.png',
    title: 'Mango Shake',
    price: '250Rs',
    description: 'Thick, creamy mango shake made from fresh ripe mangoes and chilled milk — sweet, smooth, and straight-up refreshing with every sip!.',
    category: 'shakes',
    range: '150 - 299Rs'
  }
]

let options = ['All', '0 - 149Rs', '150 - 299Rs', '300 - 499Rs', '500RS+']
let select = options.map(function (option) {
  if (option == 'All') {
    return `<button onclick='allItems()'>${option}</button>`
  }
  return ` <button onclick="rangeMenu('${option}')">${option}</button>`
})
document.querySelector('.select-btns').innerHTML = select.join('')


function rangeMenu(range) {
  let items = menu.filter(function (menu) {
    document.querySelector('.select p').innerText = range
    return menu.range.toLowerCase() == range.toLowerCase()
  }).map(menuFunc)
  document.querySelector('#foodItems').innerHTML = items.join('')
}
document.querySelector('.select-btns button').addEventListener('click', function () {
  document.querySelector('.select p').innerText = 'All'
})
function openOptions() {
  document.querySelector('.select-btns').style.display = 'flex'
  document.querySelector('.select p').setAttribute('onclick', 'closeOptions()')
}
function closeOptions() {
  document.querySelector('.select-btns').style.display = 'none'
  document.querySelector('.select p').setAttribute('onclick', 'openOptions()')
}


function search() {
  let userInput = document.querySelector('.search input').value.toLowerCase().trim()
  let items = menu.filter(function (item) {
    return item.title.toLowerCase().includes(userInput)
  }).map(menuFunc)
  document.querySelector('#foodItems').innerHTML = items.join('')
  if (items == '') {
    let p = document.createElement('p')
    document.querySelector('#foodItems').prepend(p)
    p.innerText = "No Item Found"
  }
}

let menuFunc = function (menu) {
  let menuHTML = `<div class="foodItem">
          <div class="img">
                  <img src="${menu.img}" alt="">
          </div>
          <div class="details">
            <div class="titlePrice">
                <h3>${menu.title}</h3>
                <p>${menu.price}</p>
            </div>
                <div class="description">
                    ${menu.description}
                </div>
                <div class="addToCart">
                    <button onclick="addToCart(this)">Add To Cart</button>
                </div>
          </div>

            </div>`
  return menuHTML
}

allItems()

function allItems() {
  let items = menu.map(menuFunc)
  document.querySelector('#foodItems').innerHTML = items.join('')
}

function menuSelection(category) {
  let items = menu.filter(function (menu) {
    return menu.category.toLowerCase() == category.toLowerCase()
  }).map(menuFunc)
  document.querySelector('#foodItems').innerHTML = items.join('')
}

