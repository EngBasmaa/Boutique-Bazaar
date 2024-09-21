// const searchQueryInput = document.getElementById("search-query");
// const productCategorySelect = document.getElementById("product-category");
// const minPriceInput = document.getElementById("min-price");
// const maxPriceInput = document.getElementById("max-price");
// const applyFiltersButton = document.getElementById("apply-filters");
// const sortBySelect = document.getElementById("sort-by");
// const cartProductsList = document.querySelector(".cartProducts");
// const totalPriceElement = document.querySelector("[data-total-price]");
// const totalQuantityElement = document.querySelector("[data-total-quantity]");
// const productsContainer = document.getElementById("products-container");

// let currentPage = 1;
// const itemsPerPage = 6;
// document.addEventListener("DOMContentLoaded", function() {
//   let products = [];
//   let cart = [];

//   fetch("https://fakestoreapi.com/products")
//     .then(response => response.json())
//     .then(data => {
//       products = Array.isArray(data) ? data : [];
//       console.log("Fetched products:", products);
//       populateCategories();
//       updateProductList();
//       addEventListeners();
//     })
//     .catch(error => console.error("Error fetching products:", error));

//   function getSafeElementValue(id) {
//     const element = document.getElementById(id);
//     return element ? element.value : "";
//   }

//   function updateProductList() {
//     if (!Array.isArray(products)) {
//       console.error("products is not an array");
//       return;
//     }

//     const productList = document.getElementById("product-list");

//     const categoryFilter = getSafeElementValue("category");
//     const priceFilter = getSafeElementValue("price");

//     productList.innerHTML = "";

//     const filteredProducts = products.filter(product => {
//       const categoryMatch =
//         categoryFilter === "" || product.category === categoryFilter;
//       let priceMatch = false;

//       if (priceFilter === "low") {
//         priceMatch = product.price < 50;
//       } else if (priceFilter === "mid") {
//         priceMatch = product.price >= 50 && product.price <= 100;
//       } else if (priceFilter === "high") {
//         priceMatch = product.price > 100;
//       } else {
//         priceMatch = true;
//       }

//       return categoryMatch && priceMatch;
//     });

//     // Pagination logic
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

//     paginatedProducts.forEach(product => {
//       const productDiv = document.createElement("div");
//       productDiv.classList.add("product");
//       productDiv.innerHTML = `
//                   <img src="${product.image}" alt="${product.title}" width="100">

//             <h2>${product.title}</h2>
//             <p>Category: ${product.category}</p>
//             <p>Price: $${product.price.toFixed(2)}</p>
//             <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
//         `;
//       productList.appendChild(productDiv);
//     });

//     document.querySelectorAll(".add-to-cart").forEach(button => {
//       button.addEventListener("click", function() {
//         addToCart(Number(this.dataset.productId));
//       });
//     });

//     // Update pagination
//     updatePagination(filteredProducts.length);
//   }

//   function updatePagination(totalItems) {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const paginationContainer = document.getElementById("pagination");

//     paginationContainer.innerHTML = ""; // Clear the previous pagination

//     if (totalPages <= 1) return; // No need to show pagination if only one page exists

//     // Add "Previous" button
//     const prevButton = document.createElement("button");
//     prevButton.textContent = "Previous";
//     prevButton.disabled = currentPage === 1;
//     prevButton.addEventListener("click", () => {
//       if (currentPage > 1) {
//         currentPage--;
//         updateProductList();
//       }
//     });
//     paginationContainer.appendChild(prevButton);

//     // Add page number buttons
//     for (let i = 1; i <= totalPages; i++) {
//       const pageButton = document.createElement("button");
//       pageButton.textContent = i;
//       if (i === currentPage) {
//         pageButton.classList.add("active");
//       }
//       pageButton.addEventListener("click", () => {
//         currentPage = i;
//         updateProductList();
//       });
//       paginationContainer.appendChild(pageButton);
//     }

//     // Add "Next" button
//     const nextButton = document.createElement("button");
//     nextButton.textContent = "Next";
//     nextButton.disabled = currentPage === totalPages;
//     nextButton.addEventListener("click", () => {
//       if (currentPage < totalPages) {
//         currentPage++;
//         updateProductList();
//       }
//     });
//     paginationContainer.appendChild(nextButton);
//   }

//   function populateCategories() {
//     if (!Array.isArray(products)) {
//       console.error("products is not an array");
//       return;
//     }

//     const categoryDropdown = document.getElementById("category");
//     if (!categoryDropdown) {
//       console.error("Category dropdown element not found");
//       return;
//     }

//     const categories = [...new Set(products.map(product => product.category))];

//     categories.forEach(category => {
//       const option = document.createElement("option");
//       option.value = category;
//       option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
//       categoryDropdown.appendChild(option);
//     });
//   }

//   function addEventListeners() {
//     const categoryElement = document.getElementById("category");
//     const priceElement = document.getElementById("price");

//     if (categoryElement) {
//       categoryElement.addEventListener("change", updateProductList);
//     }

//     if (priceElement) {
//       priceElement.addEventListener("change", updateProductList);
//     }
//   }

//   function addToCart(productId) {
//     const productToAdd = products.find(p => p.id === productId);
//     if (!productToAdd) {
//       console.error("Product not found in products array");
//       return;
//     }

//     const productInCart = cart.find(item => item.product.id === productId);
//     if (productInCart) {
//       productInCart.quantity++;
//     } else {
//       cart.push({ product: productToAdd, quantity: 1 });
//     }

//     updateCart();
//   }

//   function updateCart() {
//     const cartItems = document.querySelector(".cart-items");
//     const cartTotalPrice = document.querySelector(".cart-total-price");

//     if (!cartItems || !cartTotalPrice) {
//       console.error("Cart elements not found");
//       return;
//     }

//     cartItems.innerHTML = "";
//     let totalPrice = 0;

//     cart.forEach(item => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${item.product.title}</td>
//         <td>$${item.product.price.toFixed(2)}</td>
//         <td>${item.quantity}</td>
//       `;
//       cartItems.appendChild(row);
//       totalPrice += item.product.price * item.quantity;
//     });

//     cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
//   }

//   // Initial rendering
//   updateProductList();
// });

document.addEventListener("DOMContentLoaded", function() {
  let products = [];
  let cart = [];
  let currentPage = 1;
  const itemsPerPage = 6;

  // Fetch products from the API
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      products = Array.isArray(data) ? data : [];
      console.log("Fetched products:", products);
      populateCategories();
      updateProductList();
      addEventListeners();
    })
    .catch(error => console.error("Error fetching products:", error));

  // Safe element retrieval
  function getSafeElementValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
  }

  // Update product list based on filters and pagination
  function updateProductList() {
    if (!Array.isArray(products)) {
      console.error("products is not an array");
      return;
    }

    const searchQuery = getSafeElementValue("search-query").toLowerCase();
    const categoryFilter = getSafeElementValue("category");
    const minPrice = parseFloat(getSafeElementValue("min-price"));
    const maxPrice = parseFloat(getSafeElementValue("max-price"));
    const sortBy = getSafeElementValue("sort-by");

    // Filter products based on the inputs
    let filteredProducts = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery);
      const matchesCategory =
        categoryFilter === "" || product.category === categoryFilter;
      const matchesPrice =
        (isNaN(minPrice) || product.price >= minPrice) &&
        (isNaN(maxPrice) || product.price <= maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products by price if needed
    if (sortBy === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Clear product list and render filtered products
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    paginatedProducts.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}" width="100">
        <h2>${product.title}</h2>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function() {
        addToCart(Number(this.dataset.productId));
      });
    });

    // Update pagination
    updatePagination(filteredProducts.length);
  }

  // Pagination control
  function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");

    paginationContainer.innerHTML = ""; // Clear previous pagination

    if (totalPages <= 1) return; // No pagination needed if there's only one page

    // Add "Previous" button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateProductList();
      }
    });
    paginationContainer.appendChild(prevButton);

    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        currentPage = i;
        updateProductList();
      });
      paginationContainer.appendChild(pageButton);
    }

    // Add "Next" button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateProductList();
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  // Populate the category dropdown with unique categories from the product list
  function populateCategories() {
    if (!Array.isArray(products)) {
      console.error("products is not an array");
      return;
    }

    const categoryDropdown = document.getElementById("category");
    if (!categoryDropdown) {
      console.error("Category dropdown element not found");
      return;
    }

    const categories = [...new Set(products.map(product => product.category))];

    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryDropdown.appendChild(option);
    });
  }

  // Add event listeners for the filters
  function addEventListeners() {
    const categoryElement = document.getElementById("category");
    const priceElement = document.getElementById("min-price");
    const maxPriceElement = document.getElementById("max-price");
    const searchElement = document.getElementById("search-query");
    const sortElement = document.getElementById("sort-by");

    categoryElement.addEventListener("change", updateProductList);
    priceElement.addEventListener("input", updateProductList);
    maxPriceElement.addEventListener("input", updateProductList);
    searchElement.addEventListener("input", updateProductList);
    sortElement.addEventListener("change", updateProductList);
  }

  // Add product to the cart
  function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) {
      console.error("Product not found in products array");
      return;
    }

    const productInCart = cart.find(item => item.product.id === productId);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.push({ product: productToAdd, quantity: 1 });
    }

    updateCart();
  }

  // Update the cart UI
  function updateCart() {
    const cartItems = document.querySelector(".cart-items");
    const cartTotalPrice = document.querySelector(".cart-total-price");

    if (!cartItems || !cartTotalPrice) {
      console.error("Cart elements not found");
      return;
    }

    cartItems.innerHTML = "";
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

    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Initial rendering
  updateProductList();
});
