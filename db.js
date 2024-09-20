fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    products = data;
    updateProductList();
    populateCategories();
  })
  .catch(error => console.error("Error fetching products:", error));
