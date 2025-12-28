const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search-button');
const cartcount = document.querySelector('.cart-count');
const fooditem = document.querySelectorAll('.food-item');

const foodlist = [
  { name: 'Burger', tag: 'burger', price: 5, src: 'images/burger.jpg' },
  { name: 'Pizza', tag: 'pizza', price: 8, src: 'images/pizza.jpg' },
  { name: 'Pasta', tag: 'pasta', price: 7, src: 'images/pasta.jpg' },
  { name: 'Rice', tag: 'rice', price: 7, src: 'images/rice.webp' },
  { name: 'Kitfo', tag: 'kitfoo', price: 7, src: 'images/kitfo.webp' },
  { name: 'qaywat', tag: 'qaywat', price: 7, src: 'images/qaywat.jpg' },
  { name: 'Firfir', tag: 'firfir', price: 7, src: 'images/firfir.jpg' },
  { name: 'Water', tag: 'water', price: 7, src: 'images/water.webp' },
  { name: 'Cocacola', tag: 'soda', price: 7, src: 'images/cocacola.jpg' },
  { name: 'Fanta', tag: 'fanta', price: 7, src: 'images/fanta.webp' }
];

// Target the container in your HTML
const foodContainer = document.querySelector('.food-item');

// Clear the container
foodContainer.innerHTML = '';

// Loop through the food list and create HTML
foodlist.forEach(food => {
  foodContainer.innerHTML += `
    <div class="food-card">
      <img src="${food.src}" alt="${food.name}" class="food-image">
      <h3 class="food-name">${food.name}</h3>
      <p class="food-price">$${food.price}</p>
      <button class="add-to-cart" data-tag="${food.tag}">Add to Cart</button>
    </div>
  `;
});
