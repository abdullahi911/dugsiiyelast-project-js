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
      { name: 'Burger', src: '../menue/images/burger.jpg', price: 400.99 },
      { name: 'Pizza', src: '../menue/images/pizza.jpg', price: 250.99 },
      { name: 'Fries', src: '../menue/images/fries.jpg', price: 150.99 },
      { name: 'Shuwarma', src: '../menue/images/shuwarma.jpg', price: 250.99 },
      { name: 'Pasta', src: '../menue/images/pasta.jpg', price: 250.99 },
      { name: 'Rice', src: '../menue/images/rice.webp', price: 250.99 },
      { name: 'Kitfo', src: '../menue/images/kitfo.webp', price: 300.99 },
      { name: 'qaywat', src: '../menue/images/qaywat.jpg', price: 250.99 },
      { name: 'Firfir', src: '../menue/images/firfir.jpg', price: 250.99 },
      { name: 'Water', src: '../menue/images/water.webp', price: 25.99 },
      { name: 'Cocacola', src: '../menue/images/cocacola.jpg', price: 30.99 },
      { name: 'Fanta', src: '../menue/images/fanta.webp', price: 30.99 },
      { name: 'Sprite', src: '../menue/images/sprite.jpg', price: 30.99 }
    ];
    return foodlist.find(f => f.name === name) || { src: '', price: 0 };
  }

  orderButton.addEventListener('click', () => {
    if (cartData.length === 0) {
      alert("No items to order!");
    } else {
      alert("Order placed successfully!");
      localStorage.removeItem('cart');
      location.reload();
    }
  });
});
