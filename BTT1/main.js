/*************************************************
 * Câu 1: Khai báo constructor function Product
 *************************************************/
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;                 // mã sản phẩm
    this.name = name;             // tên sản phẩm
    this.price = price;           // giá sản phẩm
    this.quantity = quantity;     // số lượng tồn kho
    this.category = category;     // danh mục
    this.isAvailable = isAvailable; // trạng thái bán
}

/*************************************************
 * Câu 2: Khởi tạo mảng products (ít nhất 6 sản phẩm,
 * thuộc ít nhất 2 danh mục khác nhau)
 *************************************************/
const products = [
    new Product(1, "iPhone 15 Pro", 35000000, 5, "Phones", true),
    new Product(2, "Samsung Galaxy S24", 29000000, 0, "Phones", true),
    new Product(3, "MacBook Pro M3", 52000000, 3, "Laptops", true),
    new Product(4, "Dell XPS 13", 42000000, 2, "Laptops", false),
    new Product(5, "AirPods Pro", 6000000, 10, "Accessories", true),
    new Product(6, "Apple Watch Ultra", 22000000, 0, "Accessories", true)
];

/*************************************************
 * Câu 3: Tạo mảng mới chỉ chứa name và price
 *************************************************/
const productNamesAndPrices = products.map(p => ({
    name: p.name,
    price: p.price
}));

console.log("Câu 3 - Name & Price:", productNamesAndPrices);

/*************************************************
 * Câu 4: Lọc các sản phẩm còn hàng (quantity > 0)
 *************************************************/
const inStockProducts = products.filter(p => p.quantity > 0);

console.log("Câu 4 - Sản phẩm còn hàng:", inStockProducts);

/*************************************************
 * Câu 5: Kiểm tra có ít nhất 1 sản phẩm
 * có giá trên 30.000.000 hay không
 *************************************************/
const hasExpensiveProduct = products.some(p => p.price > 30000000);

console.log("Câu 5 - Có sản phẩm > 30 triệu:", hasExpensiveProduct);

/*************************************************
 * Câu 6: Kiểm tra tất cả sản phẩm thuộc danh mục
 * "Accessories" có đang được bán hay không
 *************************************************/
const allAccessoriesAvailable = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true);

console.log("Câu 6 - Accessories đều đang bán:", allAccessoriesAvailable);

/*************************************************
 * Câu 7: Tính tổng giá trị kho hàng
 *************************************************/
const totalInventoryValue = products.reduce((total, p) => {
    return total + p.price * p.quantity;
}, 0);

console.log("Câu 7 - Tổng giá trị kho:", totalInventoryValue);

/*************************************************
 * Câu 8: Dùng for...of duyệt mảng products
 * và in: Tên sản phẩm - Danh mục - Trạng thái
 *************************************************/
console.log("Câu 8:");
for (const p of products) {
    const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
    console.log(`${p.name} - ${p.category} - ${status}`);
}

/*************************************************
 * Câu 9: Dùng for...in để
 * - In ra tên thuộc tính
 * - In ra giá trị tương ứng
 *************************************************/
console.log("Câu 9:");
for (const key in products[0]) {
    console.log(`Thuộc tính: ${key}, Giá trị: ${products[0][key]}`);
}

/*************************************************
 * Câu 10: Lấy danh sách tên các sản phẩm
 * đang bán và còn hàng
 *************************************************/
const sellingAndInStockNames = products
    .filter(p => p.isAvailable === true && p.quantity > 0)
    .map(p => p.name);

console.log("Câu 10 - Sản phẩm đang bán & còn hàng:", sellingAndInStockNames);
