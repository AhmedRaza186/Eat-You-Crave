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
  let priceText = item.querySelector('.titlePrice p').innerText

  let sidebarItem = document.createElement('div')
  sidebarItem.classList.add('sidebar-item')
  sidebarItem.innerHTML = `
    <img src="${img}" alt="">
    <div class="sidebar-item-txt">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <div class="sidebar-price-dlt">
      <p>${priceText}</p>
      <button onclick="removeFromCart(this)">Remove</button>
    </div>
  `
  document.querySelector('.sidebar-main').appendChild(sidebarItem)

  let priceNum = Number(priceText.replace('Rs', '').trim())
  subArr.push(priceNum)

  let subTotal = subArr.reduce((total, curr) => total + curr, 0);
  let tax = Math.floor(subTotal / 7);
  let total = subTotal + tax

  document.querySelector('#subtotal p:last-child').innerText = `${subTotal}Rs`
  document.querySelector('#tax p:last-child').innerText = `${tax}Rs`
  document.querySelector('#total p:last-child').innerText = `${total}Rs`
}


function removeFromCart(btn){
  let item = btn.closest('.sidebar-item')
  item.style.display = 'none'
  let price = item.children[2].firstElementChild.innerText
  let priceNum = Number(price.replace('Rs', ''))

  let subText = document.getElementById('subtotal').lastElementChild.innerText
  let currentSub = Number(subText.replace('Rs', ''))

  let newSub = currentSub - priceNum
  newSub = newSub.toFixed(2)
  
  subTotal = Number(newSub)
  let tax = Number( subTotal / 7)
  let total = Number( subTotal + tax)
  
  tax = Math.floor(tax)
  total = total.toFixed(2)
  document.getElementById('subtotal').lastElementChild.innerText = `Rs${subTotal}`
  document.getElementById('tax').lastElementChild.innerText = `Rs${tax}`
  document.getElementById('total').lastElementChild.innerText = `Rs${total}`

}

let btnsArr = ['All','Breakfast','Lunch','Shakes']
let btns = btnsArr.map((btn)=>{
    if(btn == 'All'){
    return `<button onclick="allItems()">${btn}</button>`
    }
    else{
        return `<button onclick="menuSelection('${btn}')">${btn}</button>`
    }
})

document.querySelector('.btns').innerHTML = btns.join('')

let menu = [
    {
        img: './assets/biryani.png',
        title : 'Chicken Biryani',
        price : '250Rs',
        description : 'Aromatic basmati rice layered with tender chicken, slow-cooked in rich spices and saffron. Every bite bursts with flavor, warmth, and a touch of tradition.',
        category: 'lunch',
        
    },
    {
        img: './assets/puloa.png',
        title : 'Chicken puloa',
        price : '250Rs',
        description : 'Long-grain rice simmered in a rich chicken broth with a delicate blend of spices, giving it a soothing aroma and a royal, melt-in-mouth taste.',
        category: 'lunch',
        
    },
    {
        img: './assets/mandhi.avif',
        title : 'Chicken Mandhi',
        price : '600Rs',
        description : 'Juicy, spiced chicken layered on golden basmati rice infused with saffron and traditional Arabian flavors — a rich and authentic Mandi experience you’ll crave again and again..',
        category: 'lunch',
        
    },
    {
        img: './assets/korma.png',
        title : 'Chicken Korma',
        price : '300Rs',
        description : 'Tender chicken cooked in a creamy, spiced yogurt gravy with a hint of nuts and aromatic herbs. A perfect blend of richness and tradition in every bite.',
        category: 'lunch',
        
    },
    {
        img: './assets/karahi.png',
        title : 'Chicken Karahi',
        price : '450Rs',
        description : 'Spicy, smoky, and full of flavor — our Chicken Karahi hits that perfect balance between heat and taste',
        category: 'lunch',
        
    },
    {
        img: './assets/Naan.png',
        title : 'Garlic Naan',
        price : '80Rs',
        description : 'Soft, fluffy naan brushed with butter and sprinkled with freshly chopped garlic — baked to perfection for that irresistible aroma and flavor.',
        category: 'lunch',
        
    },
    {
        img: './assets/halwapuri.png',
        title : 'Halwa Puri',
        price : '180Rs',
        description : 'Golden, crispy puris served with sweet suji halwa and spicy chana curry — the perfect blend of flavors to start your morning with pure desi happiness.',
        category:'breakfast'
    },
    {
        img: './assets/paratha.png',
        title : 'Paratha',
        price : '50Rs',
        description : 'Crispy, multi-layered paratha cooked with ghee until golden brown — soft inside, crunchy outside, and packed with buttery flavor.',
        category:'breakfast'
    },
    {
        img: './assets/strawberryshake.png',
        title : 'Strawberry Shake',
        price : '250Rs',
        description : 'Fresh, juicy strawberries bursting with natural sweetness and vibrant flavor — a refreshing treat for any time of the day.',
        category:'shakes'
    },
    {
        img: './assets/mangoshake.png',
        title : 'Mango Shake',
        price : '250Rs',
        description : 'Thick, creamy mango shake made from fresh ripe mangoes and chilled milk — sweet, smooth, and straight-up refreshing with every sip!.',
        category:'shakes'
    }
]

let menuFunc = function(menu){
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

function allItems(){
    let items = menu.map(menuFunc)
document.querySelector('#foodItems').innerHTML = items.join('')
}

function menuSelection(category){
    let items = menu.filter(function(menu){
        return menu.category.toLowerCase() == category.toLowerCase()
    }).map(menuFunc)
    document.querySelector('#foodItems').innerHTML = items.join('')
}

