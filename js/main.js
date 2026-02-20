import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkksOEOSgRO2PJll2B56aREQNKhV7VhvU",
  authDomain: "studio-3236344976-c8013.firebaseapp.com",
  databaseURL: "https://studio-3236344976-c8013-default-rtdb.firebaseio.com",
  projectId: "studio-3236344976-c8013",
  storageBucket: "studio-3236344976-c8013.firebasestorage.app",
  messagingSenderId: "689062563273",
  appId: "1:689062563273:web:d33345675e48451481ac18"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- تغيير اللغة ---
window.switchLang = function(lang){
  alert("سيتم تغيير اللغة إلى: " + lang + " (ستضاف لاحقًا الترجمة الفعلية)");
}

// --- عرض المنتجات ---
const productsContainer = document.getElementById("products");
if(productsContainer){
  const productsRef = ref(db, 'products');
  onValue(productsRef, (snapshot)=>{
    productsContainer.innerHTML = "";
    const data = snapshot.val();
    for(let key in data){
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
