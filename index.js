const bagelList = document.querySelector('#bagels')
const bagelsURL = `http://localhost:3000/bagels`
const quantitySelect = document.querySelector('.quantity')
const bagelMenu = document.querySelector('#bagel-menu')
const aboutLink = document.querySelector('#about-link')
const menuLink = document.querySelector('#menu-link')
const aboutInfo = document.querySelector('#about-info')
const cartLink = document.querySelector('#cart-link')
const cartContent = document.querySelector('.content-section')
const loginLink = document.querySelector('#login-link')
const loginPage = document.querySelector('.login-page')
const loginForm = document.querySelector('.login-form')

fetch(bagelsURL)
.then(response => response.json())
// .then(showBagels)

welcome()

function welcome(){
    bagelMenu.style.display = 'none'
    aboutInfo.style.display = 'block'
    cartContent.style.display='none'
    loginPage.style.display = 'none'
}

aboutLink.addEventListener('click', event => renderAboutInfo())

function renderAboutInfo(){
    event.preventDefault()
    aboutInfo.style.display = 'block'
    bagelMenu.style.display = 'none'
    cartContent.style.display='none'
    loginPage.style.display = 'none'
}

menuLink.addEventListener('click', event => renderBagels())

function renderBagels(){
    event.preventDefault()
    cartContent.style.display='block'
    bagelMenu.style.display = 'block'
    aboutInfo.style.display = 'none'
    loginPage.style.display = 'none'
}

// cartLink.addEventListener('click', event => renderCart())

// function renderCart(){
//     event.preventDefault()
//     bagelMenu.style.display = 'none'
//     aboutInfo.style.display = 'none'
//     cartContent.style.display='block'
//     loginPage.style.display = 'none'
// }

loginLink.addEventListener('click', event => renderLoginPage())

function renderLoginPage(){
    event.preventDefault()
    bagelMenu.style.display = 'none'
    aboutInfo.style.display = 'none'
    cartContent.style.display='none'
    loginPage.style.display = 'block'
}


// function showBagels(){
    // bagels.forEach(bagel => {
    //     const oneBagel = document.createElement('li')
    //     oneBagel.textContent = bagel.title
    //     const addToCart = document.createElement('button')
    //     addToCart.innerText = 'Add to Cart'
    //     const quantitySelect = document.createElement('select')
    //     quantitySelect.innerHTML = 
    //         `<option value="1 Dozen">1 Dozen</option>
    //         <option value="2 Dozen">2 Dozen</option>
    //         <option value="3 Dozen">3 Dozen</option>
    //         <option value="4 Dozen">4 Dozen</option>
    //         <option value="5 Dozen">5 Dozen</option>
    //         <option value="6 Dozen">6 Dozen</option>
    //         <option value="7 Dozen">7 Dozen</option>
    //         <option value="8 Dozen">8 Dozen</option>
    //         <option value="9 Dozen">9 Dozen</option>
    //         <option value="10 Dozen">10 Dozen</option>`
    //     bagelList.append(oneBagel, quantitySelect, addToCart)
    //     const bagelPrice = document.createElement('p')
    //     bagelPrice.textContent = `$${bagel.price} per dozen`
    //     oneBagel.append(bagelPrice)

    // })
// }

// const removeCartItemButtons = document.getElementsByClassName('btn-danger')

// for (let i = 0; i < removeCartItemButtons.length; i++){
//     let button = removeCartItemButtons[i]
//     button.addEventListener('click', function(event) {
//         let buttonClicked = event.target
//         buttonClicked.parentElement.parentElement.remove()
//     })
// }
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-items')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <select class="cart-quantity-input">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select>
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = (Math.round(total * 100) / 100).toFixed(2)
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}