// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.product.id === productId);

  if (cartItem) {
    cartItem.quantity += 1; // Increase quantity if item already in cart
  } else {
    cart.push({ product, quantity: 1 }); // Add new item to cart
  }

  updateCart();
}

// Function to update cart UI and total
function updateCart() {
  const cartItems = document.querySelector(".cart-items");
  const cartTotalPrice = document.querySelector(".cart-total-price");
  cartItems.innerHTML = ""; // Clear existing cart items

  let totalPrice = 0;
  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.product.title}</td>
          <td>$${item.product.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
        `;
    cartItems.appendChild(row);
    totalPrice += item.product.price * item.quantity;
  });

  // Update total price
  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}
