const cartIcon = document.querySelector(".icon-cart");
const cart = document.querySelector (".listCart"); 
const cartClose = document.querySelector(".close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll (".addCart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".Cat-Item");
        addToCart(productBox);
    });

});
const cartContent = document.querySelector(".listCart");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".name").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    //ITEM IS ALREADY IN CART MESSAGE
const cartItems = cartContent.querySelectorAll(".name");
for (let item of cartItems) {
    if (item.textContent === productTitle) {
        alert("This item is already in the cart.");
        return;
    }
}

    const cartBox = document.createElement("div");
    cartBox.classList.add("Cat-Item");
    cartBox.innerHTML = `
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
                           <span class="decrement">-</span>
                           <span>${cart.quantity}</span>
                           <span class="increment">+</span>
                    <i><img src="trashbin.png" id="cart-remove"></i>      
                    </div>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector("#cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    //PLUS AND MINUS 
    cartBox.querySelector(".quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity;

        updateTotalPrice();

    });
    updateCartCount(1);

    updateTotalPrice();
};

//TOTAL PRICE
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".total-price");
        const qualityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("UGX","");
        const quantity = qualityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `UGX ${total}`;
};

//NUMBER ON CART IN NAVBAR
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

//BUY BUTTON
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase!")
});

const initApp = () => {
    //get data from json
    fetch('MPWRCART.json')
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


