var events = [
    {
        event: "Live UH Sports Night",
        date: "04-16-2024",
        description: "Come on in and enjoy our UH sports game"
    },
    {
        event: "Free Coffee and Tea Day",
        date: "05-16-2024",
        description: "Come Join Us for free Coffee and Tea"
    },
    {
        event: "Free Lunch Cougar Card Giveaway!",
        date: "05-03-2024",
        description: "Buy a ticket for a raffle to get free lunch for a semester"
    },
    {
        event: "Nutrition and Wellness Seminars",
        date: "05-10-2024",
        description: "Come Join us at the cafe as we go over healthy food choices"
    }
];

// Function to display events
function showEvents() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = "";
  
    events.forEach(function(event) {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');
      eventElement.innerHTML = `
        <h2>${event.event}</h2>
        <p>Date: ${event.date}</p>
        <p>${event.description}</p>
      `;
      eventsContainer.appendChild(eventElement);
    });
  }
  
  showEvents();
  
  document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-quantity');
    const cartItemList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.shopping-cart');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.sidebar-close');
  
    let cartItems = [];
    let totalAmount = 0;
  
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const item = {
          name: document.querySelectorAll('.menu-item h5')[index].textContent,
          price: parseFloat(document.querySelectorAll('.menu-item span')[index].textContent.slice(1)),
          quantity: 1
        };
  
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cartItems.push(item);
        }
  
        totalAmount += item.price;
        updateCartUI();
      });
    });
  
    function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
    }
  
    function updateCartItemCount(count) {
      cartItemCount.textContent = count;
    }
  
    function updateCartItemList() {
      cartItemList.innerHTML = "";
      cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'individual-cart-item');
        cartItem.innerHTML = `
          <span>(${item.quantity}x) ${item.name}</span>
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}
          <button class="remove-btn" data-index="${index}">
            <i class="fa-solid fa-times"></i>
          </button>
          </span>
        `;
        cartItemList.appendChild(cartItem);
      });
  
      const removeButtons = document.querySelectorAll('.remove-btn');
      removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const index = event.target.dataset.index;
          removeItemFromCart(index);
        });
      });
    }
  
    function removeItemFromCart(index) {
      const removedItem = cartItems.splice(index, 1)[0];
      totalAmount -= removedItem.price * removedItem.quantity;
      updateCartUI();
    }
  
    function updateCartTotal() {
      cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }
  
    cartIcon.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  
    closeButton.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });