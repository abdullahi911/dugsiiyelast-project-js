document.addEventListener('DOMContentLoaded', () => {
  const moneyCard = document.querySelector('.money-card');
  const quantityElem = moneyCard.querySelectorAll('p')[1]; 
  const orderButton = moneyCard.querySelector('.BUY');

  const cartContainer = document.createElement('div');
  cartContainer.className = 'cart-items-container';
  moneyCard.appendChild(cartContainer);

  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartData.length === 0) {
    quantityElem.textContent = "0 items";
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-cart-message';
    emptyMessage.textContent = "No items in cart.";
    cartContainer.appendChild(emptyMessage);
  } else {
    displayCart(cartData);
  }

  function displayCart(cartData) {
    cartContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cartData.forEach(item => {
      const foodInfo = getFoodInfo(item.name);

      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';

      const img = document.createElement('img');
      img.src = foodInfo.src;
      img.alt = item.name;
      img.className = 'cart-item-img';

      const info = document.createElement('div');
      info.className = 'cart-item-info';
      info.innerHTML = `<strong>${item.name}</strong><br>ETB ${foodInfo.price}`;

      itemDiv.append(img, info);
      cartContainer.appendChild(itemDiv);

      totalItems += item.quantity;
      totalPrice += item.quantity * foodInfo.price;
    });

    quantityElem.textContent = `${totalItems} items`;

    const totalElem = document.createElement('p');
    totalElem.className = 'cart-total';
    totalElem.textContent = `Total: ETB ${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalElem);
  }

  function getFoodInfo(name) {
    
const foodlist = [
  { name: 'Burger', src: '../images/burger.jpg', price: 400.99 },
  { name: 'Pizza', src: '../images/pizza.jpg', price: 250.99 },
  { name: 'Fries', src: '../images/fries.jpg', price: 150.99 },
  { name: 'Shuwarma', src: '../images/shuwarma.jpg', price: 250.99 },
  { name: 'Pasta', src: '../images/pasta.jpg', price: 250.99 },
  { name: 'Rice', src: '../images/rice.webp', price: 250.99 },
  { name: 'Kitfo', src: '../images/kitfo.webp', price: 300.99 },
  { name: 'qaywat', src: '../images/qaywat.jpg', price: 250.99 },
  { name: 'Firfir', src: '../images/firfir.jpg', price: 250.99 },
  { name: 'Water', src: '../images/water.webp', price: 25.99 },
  { name: 'Cocacola', src: '../images/cocacola.jpg', price: 30.99 },
  { name: 'Fanta', src: '../images/fanta.webp', price: 30.99 },
  { name: 'Sprite', src: '../images/sprite.jpg', price: 30.99 }
];
    return foodlist.find(f => f.name === name) || { src: '', price: 0 };
  }

orderButton.addEventListener('click', () => {
  // Read latest cart data
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  const oldCard = document.querySelector('.payment-card');
  if (oldCard) oldCard.remove();

  if (cartData.length === 0) {
    showDesktopMessage("No items in cart to place an order.", "error");
    return;
  }

  const paymentCard = document.createElement('div');
  paymentCard.className = 'payment-card';

  paymentCard.innerHTML = `
    <h3>Choose Payment Method</h3>

    <div class="payment-option">
      <input type="radio" id="cash" name="payment" value="Cash" checked>
      <label for="cash">💵 Cash on Delivery</label>
    </div>

    <div class="payment-option">
      <input type="radio" id="card" name="payment" value="Card">
      <label for="card">💳 Credit / Debit Card</label>
    </div>

    <button class="confirm-order-btn">Confirm Order</button>
  `;

  moneyCard.appendChild(paymentCard);

  paymentCard.querySelector('.confirm-order-btn')
    .addEventListener('click', () => {
      const selectedPayment = document.querySelector(
        'input[name="payment"]:checked'
      ).value;

      localStorage.setItem('paymentMethod', selectedPayment);
      localStorage.setItem('orderStatus', 'placed');
      localStorage.removeItem('cart');

      showDesktopMessage(
        `Order placed successfully! Payment: ${selectedPayment}`,
        "success"
      );

      setTimeout(() => {
        location.reload();
      }, 2500);
    });
})
  function showDesktopMessage(message, type) {
    const existingMsg = document.querySelector('.desktop-message');

    if (existingMsg) existingMsg.remove();
    const msgDiv = document.createElement('div');
    msgDiv.className = `desktop-message ${type}`;
    msgDiv.textContent = message;
    document.body.appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.remove();
    }, 2000);
  }
  });