let iconCart = document.querySelector('.icon-cart'); // cart appears when icon is tapped
let closeCart = document.querySelector('.close'); //hides cart icon when icon cart icon is clicked
let body = document.querySelector('body');
let CatalogueHTML = document.querySelector('.Catalogue');// getting data from json
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let Catalogues = [];
let carts = [];

iconCart.addEventListener('click', () => { //when cart is clicked
    body.classList.toggle('showCart') // shows cart when clicked
})
closeCart.addEventListener('click', () => { //closing the cart window
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    CatalogueHTML.innerHTML = '';
    if(Catalogues.length > 0){
        Catalogues.forEach(product => { //to retrieve each product
            let newProduct = document.createElement('div');
            newProduct.classList.add('Cat-Item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <div class="discount">
                <h5>15%</h5>
            </div>
            <div class="name">
                <h4>${product.name}</h4></div>
            <div class="price">
                <p>UGX ${product.price}</p>
            </div>
            <div class="addCart">Add to Cart</div> 
            `;//the above is for the items in html connecting json
            CatalogueHTML.appendChild(newProduct);   
        })
    }
}

//CHECKOUT
/*
let listCart = [];
function checkCart();
var cookieValue = document.cookie
.split('; ')
.find(row => row.startsWith('listCart='))
if(cookieValue){
    listCart = JSON.parse(cookieValue.split('=')(1));
}
checkCart();
*/

CatalogueHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
       let product_id = positionClick.parentElement.dataset.id;
       addToCart(product_id);// the message that pops up when you add to caART    
   }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
      }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
       });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    
   addCartToHTML();
   addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0; //number on cart
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity; //number on cart
            let newCart = document.createElement('div');
            newCart.classList.add('Cat-Item');
            newCart.dataset.id = cart.product_id; //minus or plus
            let positionProduct = Catalogues.findIndex((value) => value.id == cart.product_id);
            let info = Catalogues[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                    <img src="${info.image}" alt="">
               </div>
               <div class="name">
               ${info.name}
               </div>
               <div class="totalPrice">
                   ${info.price * cart.quantity}/=
               </div>
               <div class="quantity">
                   <span class="minus">-</span>
                   <span>${cart.quantity}</span>
                   <span class="plus">+</span>
               </div>
            `; //Above is the things being sent to the cart
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity; //number on cart
}

///PLUS AND MINUS IN CART
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}


const initApp = () => {
    //get data from json
    fetch("/data/MPWRCART.json")
    .then(response => response.json())
    .then(data => {
        Catalogues = data;
        //console.log(Catalogues);
        addDataToHTML();

        //get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();