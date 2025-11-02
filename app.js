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
  let item = btn.closest('.items');
  let img = item.firstElementChild.src
  let title = item.children[1].innerText
  let description = item.children[2].innerText
  let price = item.children[3].firstElementChild.innerText
  
  let sidebarItem = document.createElement('div')
  sidebarItem.setAttribute('class', 'sidebar-item')
  sidebarItem.innerHTML = `<img src="${img}" alt=""><div class="sidebar-item-txt"><h3>${title}</h3><p>${description}</p></div><div class="sidebar-price-dlt"><p>${price}</p><button onclick="removeFromCart(this)">Remove From Cart</button></div>`
  document.getElementsByClassName('sidebar-main')[0].appendChild(sidebarItem)
 let priceNum = Number(price.replace('$', ''))
  subArr.push(priceNum)
  let subTotal = subArr.reduce(function(total,curr){
    return total + curr
    
  },0)
  subTotal = subTotal.toFixed(2)
  
  subTotal = Number(subTotal)
  let tax = Number( subTotal / 7)
  let total = Number( subTotal + tax)
  
  tax = Math.floor(tax)
  total = total.toFixed(2)
  document.getElementById('subtotal').lastElementChild.innerText = `$${subTotal}`
  document.getElementById('tax').lastElementChild.innerText = `$${tax}`
  document.getElementById('total').lastElementChild.innerText = `$${total}`
  console.log(tax)
  
}


function removeFromCart(btn){
  let item = btn.closest('.sidebar-item')
  item.style.display = 'none'
  let price = item.children[2].firstElementChild.innerText
  let priceNum = Number(price.replace('$', ''))

  let subText = document.getElementById('subtotal').lastElementChild.innerText
  let currentSub = Number(subText.replace('$', ''))

  let newSub = currentSub - priceNum
  newSub = newSub.toFixed(2)
  
  subTotal = Number(newSub)
  let tax = Number( subTotal / 7)
  let total = Number( subTotal + tax)
  
  tax = Math.floor(tax)
  total = total.toFixed(2)
  document.getElementById('subtotal').lastElementChild.innerText = `$${subTotal}`
  document.getElementById('tax').lastElementChild.innerText = `$${tax}`
  document.getElementById('total').lastElementChild.innerText = `$${total}`

}
let menu = [
    {
        img: './assets/biryani.png',
        title : 'Chicken Biryani',
        price : '250Rs',
        description : 'Aromatic basmati rice layered with tender chicken, slow-cooked in rich spices and saffron. Every bite bursts with flavor, warmth, and a touch of tradition.',
        category: 'lunch',
        category: 'dinner'
    },
    {
        img: './assets/puloa.png',
        title : 'Chicken puloa',
        price : '250Rs',
        description : 'Long-grain rice simmered in a rich chicken broth with a delicate blend of spices, giving it a soothing aroma and a royal, melt-in-mouth taste.',
        category: 'lunch',
        category: 'dinner'
    },
    {
        img: './assets/mandhi.avif',
        title : 'Chicken Mandhi',
        price : '600Rs',
        description : 'Juicy, spiced chicken layered on golden basmati rice infused with saffron and traditional Arabian flavors — a rich and authentic Mandi experience you’ll crave again and again..',
        category: 'lunch',
        category: 'dinner'
    },
    {
        img: './assets/korma.png',
        title : 'Chicken Korma',
        price : '300Rs',
        description : 'Tender chicken cooked in a creamy, spiced yogurt gravy with a hint of nuts and aromatic herbs. A perfect blend of richness and tradition in every bite.',
        category: 'lunch',
        category: 'dinner'
    },
    {
        img: './assets/karahi.png',
        title : 'Chicken Karahi',
        price : '450Rs',
        description : 'Spicy, smoky, and full of flavor — our Chicken Karahi hits that perfect balance between heat and taste',
        category: 'lunch',
        category: 'dinner'
    },
    {
        img: './assets/Naan.png',
        title : 'Garlic Naan',
        price : '80Rs',
        description : 'Soft, fluffy naan brushed with butter and sprinkled with freshly chopped garlic — baked to perfection for that irresistible aroma and flavor.',
        category: 'lunch',
        category: 'dinner'
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

function menu(category){
    let items = menu.filter(function(category){
    return menu.category.toLowerCase() == category.toLowerCase()
}).map(function(menu){
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
})
document.querySelector('#foodItems').innerHTML = items.join('')


}