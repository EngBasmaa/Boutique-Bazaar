const searchQueryInput = document.getElementById("search-query");
const productCategorySelect = document.getElementById("product-category");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const applyFiltersButton = document.getElementById("apply-filters");
const sortBySelect = document.getElementById("sort-by");
const cartProductsList = document.querySelector(".cartProducts");
const totalPriceElement = document.querySelector("[data-total-price]");
const totalQuantityElement = document.querySelector("[data-total-quantity]");
const productsContainer = document.getElementById("products-container");
const applyFilters = document.getElementById("apply-filters");

let currentPage = 1;
const itemsPerPage = 6;

// products
function updateProductList() {
  const filteredProducts = products.filter(product => {
    const searchTerm = searchQueryInput.value.toLowerCase();
    const category = productCategorySelect.value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    // console.log(`Filtering product ${product.title}:`);
    // console.log(`Search term: "${searchTerm}"`);
    // console.log(`Category: "${category}"`);
    // console.log(`Min price: ${minPrice}`);
    // console.log(`Max price: ${maxPrice}`);

    const productNameLowercase = (product.title || "").toLowerCase();

    const searchTermMatch =
      !searchTerm || productNameLowercase.includes(searchTerm);
    const categoryMatch = !category || product.category === category;
    const priceMatch = product.price >= minPrice && product.price <= maxPrice;

    // console.log(`Search term match: ${searchTermMatch}`);
    // console.log(`Category match: ${categoryMatch}`);
    // console.log(`Price match: ${priceMatch}`);

    return (
      (productNameLowercase.includes(searchTerm) || searchTerm === "") &&
      (category === "" || product.category === category) &&
      product.price >= (parseInt(minPriceInput.value) || 0) &&
      product.price <= (parseInt(maxPriceInput.value) || Infinity)
    );
  });

  console.log("Filtered products count:", filteredProducts.length);

  if (filteredProducts.length === 0) {
    console.warn("No products found after filtering");
    productsContainer.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  if (sortBySelect.value === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBySelect.value === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // pagination
  renderPaginatedProducts(filteredProducts, currentPage);
  updatePagination(filteredProducts.length);

  // const productsHtml = renderProducts(filteredProducts);
  // // console.log("Applying HTML to container:", productsHtml);
  // productsContainer.innerHTML = productsHtml;
  // console.log("DOM update completed");
}

// pagination functions

function renderPaginatedProducts(products, pageNumber) {
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedProducts = products.slice(start, end);

  const productsHtml = renderProducts(paginatedProducts);
  productsContainer.innerHTML = productsHtml;
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationList = document.getElementById("pagination-list");
  paginationList.innerHTML = "";

  const previousButton = document.createElement("li");
  previousButton.className = "page-item";
  previousButton.innerHTML = `<a class="page-link" href="#" id="previous-page">Previous</a>`;
  paginationList.appendChild(previousButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = "page-item";
    pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
    paginationList.appendChild(pageItem);
  }

  const nextButton = document.createElement("li");
  nextButton.className = "page-item";
  nextButton.innerHTML = `<a class="page-link" href="#" id="next-page">Next</a>`;
  paginationList.appendChild(nextButton);

  updatePageButtons();
}

function updatePageButtons() {
  const previousButton = document.getElementById("previous-page");
  const nextButton = document.getElementById("next-page");
  const pageLinks = document.querySelectorAll(
    ".pagination a.page-link:not(#previous-page):not(#next-page)"
  );

  previousButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(products.length / itemsPerPage);

  pageLinks.forEach(link => {
    link.classList.remove("active");
    if (parseInt(link.dataset.page) === currentPage) {
      link.classList.add("active");
    }
  });
}

function changePage(newPage) {
  currentPage = newPage;
  updateProductList();
  updatePageButtons();
}

// Add these event listeners in your DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // ... existing event listeners ...

  const paginationList = document.getElementById("pagination-list");
  paginationList.addEventListener("click", e => {
    if (e.target.id === "previous-page") {
      changePage(currentPage - 1);
    } else if (e.target.id === "next-page") {
      changePage(currentPage + 1);
    } else if (e.target.dataset.page) {
      changePage(parseInt(e.target.dataset.page));
    }
  });

  // Initial rendering
  updateProductList();
});

// .............

function populateCategories() {
  const select = document.getElementById("product-category");
  select.innerHTML = "";
  select.innerHTML += '<option value="">All Categories</option>';

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics"
  ];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", populateCategories);

// rendering
function renderProductDetails(product, quantity = 1) {
  const totalPrice = (product.price * quantity).toFixed(2); // Calculate total price
  return `
    <div class="product-details">
      <p class="product-title">${product.title}</p>
      <p class="product-price">$${totalPrice}</p>
    </div>
  `;
}

function renderProducts(products) {
  let productsHtml = "";
  products.forEach(product => {
    console.log("Rendering product:", product); // Log each product

    productsHtml += `
      <div class="card col-4 col-md-6 col-sm-12">
        <img class="card-img-top" src="${product.image}" alt="Product Image">
        <div class="card-body">
          ${renderProductDetails(product)}
          <p class="card-text">${product.description}</p>
          <button class="btn add-to-cart-btn" data-product-id="${product.id}" onclick="addToCart(${product})">Add to Cart</button>
        </div>
      </div>
    `;
  });

  return productsHtml;
}

fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    products = data;
    updateProductList();
  })
  .catch(error => console.error("Error fetching products:", error));
