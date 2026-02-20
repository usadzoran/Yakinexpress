import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkksOEOSgRO2PJll2B56aREQNKhV7VhvU",
  authDomain: "studio-3236344976-c8013.firebaseapp.com",
  databaseURL: "https://studio-3236344976-c8013-default-rtdb.firebaseio.com",
  projectId: "studio-3236344976-c8013",
  storageBucket: "studio-3236344976-c8013.firebasestorage.app",
  messagingSenderId: "689062563273",
  appId: "1:689062563273:web:d33345675e48451481ac18"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- عرض المنتجات في الصفحة الرئيسية ---
const productsContainer = document.getElementById("products");
if(productsContainer){
  const productsRef = ref(db, 'products');
  onValue(productsRef, (snapshot) => {
    productsContainer.innerHTML = "";
    const data = snapshot.val();
    for (let key in data) {
      const p = data[key];
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        ${p.showDiscount ? `<p><del>$${p.price}</del> <strong>$${p.discountPrice}</strong></p>` : `<p>$${p.price}</p>`}
        <a href="product.html?id=${key}"><button>عرض المنتج</button></a>
      `;
      productsContainer.appendChild(div);
    }
  });
}

// --- تفاصيل المنتج ---
const productDetail = document.getElementById("product-detail");
if(productDetail){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const productRef = ref(db, 'products/' + id);
  onValue(productRef, (snapshot) => {
    const p = snapshot.val();
    if(p){
      productDetail.innerHTML = `
        <img src="${p.image}" alt="${p.name}" width="300">
        <h2>${p.name}</h2>
        ${p.showDiscount ? `<p><del>$${p.price}</del></p><h3>$${p.discountPrice}</h3>` : `<h3>$${p.price}</h3>`}
        <p>${p.description}</p>
        <a href="${p.affiliateLink}" target="_blank"><button>اشتر الآن</button></a>
      `;
    } else { productDetail.innerHTML = `<p>المنتج غير موجود</p>`; }
  });
}

// --- لوحة التحكم ---
const productList = document.getElementById("product-list");
const productCount = document.getElementById("product-count");
if(productList && productCount){
  const productsRef = ref(db, 'products');
  onValue(productsRef, snapshot => {
    productList.innerHTML = "";
    const data = snapshot.val();
    const keys = Object.keys(data || {});
    productCount.textContent = keys.length;
    keys.forEach(key => {
      const p = data[key];
      const div = document.createElement("div");
      div.innerHTML = `${p.name} - $${p.price} <button onclick="deleteProduct('${key}')">حذف</button>`;
      productList.appendChild(div);
    });
  });

  // حذف منتج
  window.deleteProduct = function(key){ set(ref(db, 'products/' + key), null); }

  // إضافة منتج
  const addForm = document.getElementById("add-product-form");
  if(addForm){
    addForm.addEventListener("submit", e => {
      e.preventDefault();
      const newProduct = {
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        discountPrice: parseFloat(document.getElementById("discountPrice").value) || 0,
        showDiscount: document.getElementById("showDiscount").checked,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        affiliateLink: document.getElementById("affiliateLink").value
      };
      push(ref(db, 'products'), newProduct);
      addForm.reset();
    });
  }
}
