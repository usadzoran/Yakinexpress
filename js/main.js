// بيانات أولية للمنتجات
const products = [
  {
    id: 1,
    name: "حذاء رياضي عصري",
    price: 60,
    discountPrice: 45,
    showDiscount: true,
    description: "حذاء مريح مناسب للرياضة والمشي اليومي.",
    image: "images/shoe.jpg",
    affiliateLink: "https://s.click.aliexpress.com/example1"
  },
  {
    id: 2,
    name: "ساعة ذكية",
    price: 120,
    showDiscount: false,
    description: "ساعة ذكية متعددة الوظائف.",
    image: "images/watch.jpg",
    affiliateLink: "https://s.click.aliexpress.com/example2"
  }
];

// إضافة المنتجات للصفحة الرئيسية
const productsContainer = document.getElementById("products");
if(productsContainer){
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      ${p.showDiscount ? `<p><del>$${p.price}</del> <strong>$${p.discountPrice}</strong></p>` : `<p>$${p.price}</p>`}
      <a href="product.html?id=${p.id}"><button>عرض المنتج</button></a>
    `;
    productsContainer.appendChild(div);
  });
}

// ملء صفحة المنتج
const productDetail = document.getElementById("product-detail");
if(productDetail){
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === id);
  if(product){
    productDetail.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="300">
      <h2>${product.name}</h2>
      ${product.showDiscount ? `<p><del>$${product.price}</del></p><h3>$${product.discountPrice}</h3>` : `<h3>$${product.price}</h3>`}
      <p>${product.description}</p>
      <a href="${product.affiliateLink}" target="_blank"><button>اشتر الآن</button></a>
    `;
  } else {
    productDetail.innerHTML = `<p>المنتج غير موجود</p>`;
  }
}

// لوحة التحكم
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
if(productList && productCount){
  productCount.textContent = products.length;
  products.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.name} - $${p.price}`;
    productList.appendChild(div);
  });
}
