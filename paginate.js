// pagination.js

const paginationList = document.getElementById("pagination-list");
let currentPage = 1;
const itemsPerPage = 6;

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

export { updatePagination, updatePageButtons, changePage };
