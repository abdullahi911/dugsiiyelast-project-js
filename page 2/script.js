
const input = document.querySelector('.input'); const searchBtn = document.querySelector('.search-button'); const cartcount = document.querySelector('.cart-count'); const fooditem = document.querySelectorAll('.food-item');
const fastFood = document.querySelector('.fast-food');
const culturalFood = document.querySelector('.cultural-food');
const drinks = document.querySelector('.drinks');

const foodlist = [
  { name: 'Burger', src: 'images/burger.jpg', price: 400.99 },
  { name: 'Pizza', src: 'images/pizza.jpg', price: 250.99 },
  { name: 'Fries', src: 'images/fries.jpg', price: 150.99 },
  { name: 'Shuwarma', src: 'images/shuwarma.jpg', price: 250.99 },

  { name: 'Pasta', src: 'images/pasta.jpg', price: 250.99 },
  { name: 'Rice', src: 'images/rice.webp', price: 250.99 },
  { name: 'Kitfo', src: 'images/kitfo.webp', price: 300.99 },
  { name: 'qaywat', src: 'images/qaywat.jpg', price: 250.99 },
  { name: 'Firfir', src: 'images/firfir.jpg', price: 250.99 },

  { name: 'Water', src: 'images/water.webp', price: 25.99 },
  { name: 'Cocacola', src: 'images/cocacola.jpg', price: 30.99 },
  { name: 'Fanta', src: 'images/fanta.webp', price: 30.99 },
  { name: 'Sprite', src: 'images/sprite.jpg', price: 30.99 }
];

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
  }
  else if (['Pasta','Rice','Kitfo','qaywat','Firfir'].includes(food.name)) {
    culturalFood.innerHTML += card;
  }
  else {
    drinks.innerHTML += card;
  }

});

searchBtn.addEventListener('click', () => {
  const searchTerm = input.value.toLowerCase();

  const categories = document.querySelectorAll('.food-menu');

  categories.forEach(category => {
    const cards = category.querySelectorAll('.food-card');
    let hasMatch = false;

    cards.forEach(card => {
      const foodName = card.querySelector('.food-name').textContent.toLowerCase();

      if (foodName.includes(searchTerm)) {
        card.style.display = 'block';
        hasMatch = true; 
      } else {
        card.style.display = 'none';
      }
    });

    if (hasMatch) {
      category.previousElementSibling.style.display = 'block'; 
      category.style.display = 'grid';
    } else {
      category.previousElementSibling.style.display = 'none';
      category.style.display = 'none';
    }
  });
});
