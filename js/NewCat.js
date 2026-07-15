let iconCart = document.querySelector('.icon-cart');   //CLEAR
let closeCart = document.querySelector('.close');     //CLEAR
let body = document.querySelector('body');             //CLEAR
let listProductHTML = document.querySelector('.listProduct');  //CLEAR
let listCartHTML = document.querySelector('.listCart'); ///CLEAR
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];   //CLEAR
let carts = [];       //CLEAR

iconCart.addEventListener('click', () => {        //CLEAR
    body.classList.toggle('showCart')           //if the body doest have showcart it will add it   
})
closeCart.addEventListener('click', () => {      //CLEAR
    body.classList.toggle('showCart')              //CLEAR
})

//ITEMS IN CART
const addDataToHTML = () => {                    //CLEAR
    listProductHTML.innerHTML = '';                   //CLEAR
    if(listProducts.length > 0){                         //CLEAR   
        listProducts.forEach(product => {              //CLEAR
            let newProduct = document.createElement('div');       //CLEAR
            newProduct.classList.add('item');             //CLEAR
            newProduct.dataset.id = product.id;               //CLEAR
            newProduct.innerHTML = `                            
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Add To Cart
                </button</>
            `;//the above is for the items in html connecting json
            listProductHTML.appendChild(newProduct);      //CLEAR
        })
   }
}

listProductHTML.addEventListener('click', (event) => {     //CLEAR
    let positionClick = event.target;                       //CLEAR
    if(positionClick.classList.contains('addCart')){         //CLEAR
       let product_id = positionClick.parentElement.dataset.id;
       addToCart(product_id);// the message that pops up when you add to caART    
   }
})

const addToCart = (product_id) => {          //CLEAR
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){           //CLEAR
        carts = [{                       //CLEAR
            product_id: product_id,      //CLEAR
            quantity: 1                     //CLEAR
      }]                                    //CLEAR
    }else if(positionThisProductInCart < 0){   //CLEAR
        carts.push({                            //CLEAR
            product_id: product_id,        //CLEAR
            quantity: 1     //CLEAR 
       });          //CLEAR
    }else{            //CLEAR 
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;   //CLEAR
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {                     //CLEAR 
    listCartHTML.innerHTML = '';                  //CLEAR
    let totalQuantity = 0;    //number on cart        //CLEAR
    if(carts.length > 0){                                     //CLEAR 
        carts.forEach(cart => {                      //CLEAR
            totalQuantity = totalQuantity + cart.quantity;        //number on cart
            let newCart = document.createElement('div');       //CLEAR
            newCart.classList.add('item');         //CLEAR
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id); //CLEAR
            let info = listProducts[positionProduct];               //CLEAR
            newCart.innerHTML = `
            <div class="image">
                    <img src="${info.image}" alt="">
               </div>
               <div class="name">
               ${info.name}
               </div>
               <div class="totalPrice">
                   $${info.price * cart.quantity}
              </div>
               <div class="quantity">
                   <span class="minus"><</span>
                   <span>${cart.quantity}</span>                 
                   <span class="plus">></span>
              </div> 
            `; //Above is the things being sent to the cart
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity; //number on cart
}

//PLUS AND MINUS IN CART
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
const changeQuantity = (product_id, type) => {   //CLEAR
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);   //CLEAR
    if(positionItemInCart >= 0){           //CLEAR
        switch (type) {                       //CLEAR
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
const initApp = () => {      //CLEAR
    //get data from json       //CLEAR
    fetch('NewCat.json')           //CLEAR
    .then(response => response.json())  ////CLEAR
    .then(data => {                     //CLEAR
        listProducts = data;                //CLEAR 
        addDataToHTML();                    //CLEAR

        //get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();