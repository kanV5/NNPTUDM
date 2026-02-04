const apiUrl = "https://api.escuelajs.co/api/v1/products";

const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
const pageSizeSelect = document.getElementById("pageSize");
const pagination = document.getElementById("pagination");

let productList = [];
let filteredList = [];
let currentPage = 1;
let pageSize = 10;

let titleAsc = true;
let priceAsc = true;

// Fetch API
fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        productList = data;
        filteredList = data;
        render();
    });

// Render
function render() {
    renderTable();
    renderPagination();
}

function getPageData() {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
}

// Table
function renderTable() {
    tableBody.innerHTML = "";

    getPageData().forEach(p => {
        const tr = document.createElement("tr");

        tr.onclick = () => openModal(p);

        tr.innerHTML = `
            <td>${p.id}</td>
            <td class="text-start">${p.title}</td>
            <td>$${p.price}</td>
            <td>${p.category?.name}</td>
            <td><img src="${p.images[0]}" class="product-img"></td>
        `;

        tableBody.appendChild(tr);
    });
}

// Pagination
function renderPagination() {
    pagination.innerHTML = "";
    const pages = Math.ceil(filteredList.length / pageSize);

    for (let i = 1; i <= pages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link">${i}</a>`;
        li.onclick = () => { currentPage = i; render(); };
        pagination.appendChild(li);
    }
}

// Search
searchInput.oninput = () => {
    filteredList = productList.filter(p =>
        p.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    currentPage = 1;
    render();
};

// Page size
pageSizeSelect.onchange = () => {
    pageSize = +pageSizeSelect.value;
    currentPage = 1;
    render();
};

// Sort
function sortByTitle() {
    filteredList.sort((a, b) =>
        titleAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    titleAsc = !titleAsc;
    render();
}

function sortByPrice() {
    filteredList.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
    );
    priceAsc = !priceAsc;
    render();
}

// ===== MODAL =====
let modal = new bootstrap.Modal(document.getElementById("productModal"));

function openModal(p) {
    document.getElementById("modalId").value = p.id;
    document.getElementById("modalTitle").value = p.title;
    document.getElementById("modalPrice").value = p.price;
    document.getElementById("modalDescription").value = p.description;
    document.getElementById("modalImage").value = p.images[0];

    modal.show();
}

// UPDATE API
function updateProduct() {
    const id = document.getElementById("modalId").value;

    const payload = {
        title: document.getElementById("modalTitle").value,
        price: +document.getElementById("modalPrice").value,
        description: document.getElementById("modalDescription").value,
        images: [document.getElementById("modalImage").value]
    };

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
        alert("Update thành công!");
        location.reload(); // reload data
    });
}

// EXPORT CSV (view hiện tại)
function exportCSV() {
    let csv = "ID,Title,Price,Category\n";
    getPageData().forEach(p => {
        csv += `"${p.id}","${p.title}","${p.price}","${p.category?.name}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "products.csv";
    a.click();
}