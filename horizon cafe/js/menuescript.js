document.addEventListener('DOMContentLoaded', () => {

  const input = document.querySelector('.input');
  const searchBtn = document.querySelector('.search-button');
  const cartcount = document.querySelector('.cart-count');

  const fastFood = document.querySelector('.fast-food');
  const culturalFood = document.querySelector('.cultural-food');
  const drinks = document.querySelector('.drinks');

  cartcount.textContent = 0;

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

  // Create food cards
  foodlist.forEach(food => {
    const card = `
      <div class="food-card">
        <img src="${food.src}" class="food-image">
        <h3 class="food-name">${food.name}</h3>
        <p class="food-price">ETB ${food.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
    if (['Burger','Pizza','Fries','Shuwarma'].includes(food.name)) {
      fastFood.innerHTML += card;
    } else if (['Pasta','Rice','Kitfo','qaywat','Firfir'].includes(food.name)) {
      culturalFood.innerHTML += card;
    } else {
      drinks.innerHTML += card;
    }
  });

  // SEARCH
  searchBtn.addEventListener('click', () => {
    const term = input.value.toLowerCase();
    document.querySelectorAll('.food-card').forEach(card => {
      const name = card.querySelector('.food-name').textContent.toLowerCase();
      card.style.display = name.includes(term) ? 'block' : 'none';
    });
  });

  // ADD TO CART
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.parentElement;
      let itemCount = 1;
      button.remove();

      const addBtn = document.createElement('button');
      addBtn.textContent = 'Add';
      addBtn.className = 'add-to-cart';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'cancel-to-cart';

      const qty = document.createElement('p');
      qty.className = 'item-count';
      qty.textContent = `Quantity: ${itemCount}`;
      qty.style.fontWeight = 'bold';

      card.append(qty, addBtn, cancelBtn);
      cartcount.textContent = +cartcount.textContent + 1;

      saveCartToLocalStorage();

      addBtn.addEventListener('click', () => {
        itemCount++;
        qty.textContent = `Quantity: ${itemCount}`;
        cartcount.textContent = +cartcount.textContent + 1;
        saveCartToLocalStorage();
      });

      cancelBtn.addEventListener('click', () => {
        itemCount--;
        cartcount.textContent = +cartcount.textContent - 1;

        if (itemCount <= 0) {
          qty.remove();
          addBtn.remove();
          cancelBtn.remove();
          card.appendChild(button);
        } else {
          qty.textContent = `Quantity: ${itemCount}`;
        }

        saveCartToLocalStorage();
      });
    });
  });

  function saveCartToLocalStorage() {
    const cartData = [];
    document.querySelectorAll('.food-card').forEach(card => {
      const name = card.querySelector('.food-name').textContent;
      const qtyElem = card.querySelector('.item-count');
      if (qtyElem) {
        const quantity = parseInt(qtyElem.textContent.replace('Quantity: ', ''));
        cartData.push({ name, quantity });
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  // RESTORE CART
  function loadCartFromLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    cartData.forEach(item => {
      document.querySelectorAll('.food-card').forEach(card => {
        const name = card.querySelector('.food-name').textContent;
        if (name === item.name) {
          let button = card.querySelector('.add-to-cart');
          if (!button) return;
          button.click();
          for (let i = 1; i < item.quantity; i++) {
            const addBtn = card.querySelector('.add-to-cart');
            if (addBtn) addBtn.click();
          }
        }
      });
    });
  }

  // SIGN-UP WELCOME
  const signUpDiv = document.querySelector(".sign-up");
  const userEmail = localStorage.getItem("loggedInUser");
  if (userEmail) {
    const userName = userEmail.split("@")[0];
    signUpDiv.innerHTML = `<span class="welcome-text">Welcome, ${userName}</span>`;
  }

  loadCartFromLocalStorage();
});