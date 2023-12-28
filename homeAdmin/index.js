const cartBtn = document.querySelector(".cart-button");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cart1 = document.querySelector(".cart1");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const buyNow = document.querySelector(".buy-now");
const cartContent = document.querySelector(".cart-content");
const productDom = document.querySelector(".product-dom");
const cartItems = document.querySelector(".cart-item1");
const checkoutCartBtn = document.querySelector(".checkout-cart");

// Event listener for checkout button
checkoutCartBtn.addEventListener("click", function () {
  // Redirect to the checkout page
  window.location.href = "/checkout.html"; // Change '/checkout.html' to your checkout page URL
});

let cart = [];
let buttonsDom = [];
// getting products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (erorr) {
      console.log(erorr);
    }
  }
}
// ui class
class Ui {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <div class="photo">
          <div class="img-container">
            <img src=${product.image} alt="Product image" />
            <div class="buttons">
              <button class="btn add-to-cart" data-product-id=${product.id}>Add To Cart</button>
              <button class="btn buy-now" data-product-id=${product.id}>Buy Now</button>
            </div>
          </div>
          <h3 class="productName">${product.title}</h3>
          <p class="productPrice">${product.price}</p>
        </div>
      `;
    });
    productDom.innerHTML = result;

    // Attach event listeners to Buy Now buttons
    const buyNowButtons = document.querySelectorAll(".buy-now");
    buyNowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = "/checkout.html"; // Redirect to checkout page
      });
    });
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".add-to-cart")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.productId;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        // get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // add product to the cart
        cart = [...cart, cartItem];
        // save cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart item
        this.addCartItem(cartItem);
        // show the cart
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item1");
    div.innerHTML = ` <img src="${item.image}" alt="" width="100px">
    <div> <h2> ${item.title} </h2></div>
    <div> <h2> ${item.price}</h2></div>
    <span class="remove-item1" data-id=${item.id}> Remove</span>
   </div>
   <div class="cart-item-amount">
     <i class='bx bx-plus' data-id=${item.id}></i>
     <p class="item-amount">${item.amount}</p>
     <i class='bx bx-minus'  data-id=${item.id}></i>`;
    cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cart1.classList.add("showCart");
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart.bind(this));
    closeCartBtn.addEventListener("click", this.hideCart.bind(this));
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cart1.classList.remove("showCart");
  }
  cartLogic() {
    clearCartBtn.addEventListener("click", this.clearCart.bind(this));
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item1")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        // Assuming the structure is:
        // div.cart-item1 > ... > span.remove-item1
        // You want to remove the div.cart-item1
        let cartItem = removeItem.closest(".cart-item1");
        if (cartItem) {
          cartContent.removeChild(cartItem);
          this.removeItem(id);
        } else {
          console.error("Could not find cart item to remove");
        }
      }
    });
  }

  clearCart() {
    // Create an array of ids from the cart items
    let cartItemsIds = cart.map((item) => item.id);
    cartItemsIds.forEach((id) => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }

    this.hideCart();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    if (button) {
      // Check if the button actually exists
      button.disabled = false;
      button.innerHTML = `<i class="fas fa-shopping-cart"></i> add to cart`;
    }
  }
  getSingleButton(id) {
    return buttonsDom.find(
      (button) => parseInt(button.dataset.productId) === id
    );
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  // mahmoud part
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

// Rest of your code where you call Storage.saveProducts

document.addEventListener("DOMContentLoaded", () => {
  const ui = new Ui();
  const products = new Products();
  // setup app
  ui.setupAPP();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });

  // Function to update the cart display
  function updateCartDisplay() {
    // Calculate total price and item count from cart
    let totalPrice = cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    let itemCount = cart.reduce((count, item) => count + item.amount, 0);

    // Update the content of cart-info
    const cartInfo = document.querySelector("#cart-info");
    if (cartInfo) {
      cartInfo.textContent = `Items: ${itemCount} | Total: $${totalPrice.toFixed(
        2
      )}`;
    }
  }
  ui.cartLogic();
  // Call updateCartDisplay to initialize the cart info
  updateCartDisplay();
});
