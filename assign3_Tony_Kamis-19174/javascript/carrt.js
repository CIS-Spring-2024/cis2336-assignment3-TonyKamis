document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-quantity');
    const cartItemList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.shopping-cart');
    const sidebar = document.querySelector('.sidebar');
    let cartItems = [];
    let totalAmount = 0;
  
    addToCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const quantityInput = document.querySelectorAll('.quantity')[index];
        let quantity = parseInt(quantityInput.value);
        if (quantity > 10) {
          quantity = 10;
          quantityInput.value = 10;
        }
        const item = {
          name: document.querySelectorAll('.menu-item h5')[index].textContent,
          price: parseFloat(document.querySelectorAll('.menu-item span')[index].textContent.slice(1)),
          quantity: quantity
        };
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cartItems.push(item);
        }
        totalAmount = calculateTotalAmount(cartItems);
        console.log("Cart Items:", cartItems);
        console.log("Total Amount:", totalAmount);
        updateCartUI();
      });
    });
  
    function calculateTotalAmount(cartItems) {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      return total;
    }
  
    function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
      initCloseButtonListener(); // Initialize close button listener after updating the UI
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
  
    // Event listener for cart icon
    cartIcon.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      initCloseButtonListener(); // Initialize close button listener when the cart icon is clicked
    });
  
    function initCloseButtonListener() {
      const closeButton = document.querySelector('.sidebar-close');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          sidebar.classList.remove('open');
        });
      }
    }
  });
  