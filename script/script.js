// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔧 Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyABalL-liOEB5174fDeJ0OWNrg_xfA1APU",
  authDomain: "legendary-motosports-864b3.firebaseapp.com",
  projectId: "legendary-motosports-864b3",
  storageBucket: "legendary-motosports-864b3.firebasestorage.app",
  messagingSenderId: "960257570446",
  appId: "1:960257570446:web:81bfc9a97664bd422a3bdf",
  measurementId: "G-4XRBSRC96D"
};

// 🚀 Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧾 DOM element
const carForm = document.getElementById("carForm");
const carTableBody = document.getElementById("carTableBody");
const loadingText = document.getElementById("loadingText");

// ➕ Thêm xe
carForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("carName").value.trim();
  const price = document.getElementById("carPrice").value.trim();

  if (!name || !price) return alert("Vui lòng nhập đầy đủ thông tin!");

  await addDoc(collection(db, "cars"), {
    name,
    price: parseInt(price).toLocaleString("vi-VN") + " ₫",
  });

  carForm.reset();
});

// 🔁 Lắng nghe thay đổi real-time
onSnapshot(collection(db, "cars"), (snapshot) => {
  carTableBody.innerHTML = "";
  if (snapshot.empty) {
    loadingText.textContent = "Chưa có xe nào trong danh sách.";
    return;
  } else {
    loadingText.textContent = "";
  }

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.price}</td>
      <td>
        <button class="edit-btn" data-id="${docSnap.id}">✏️</button>
        <button class="delete-btn" data-id="${docSnap.id}">🗑️</button>
      </td>
    `;
    carTableBody.appendChild(row);
  });

  // Gắn sự kiện cho các nút
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const oldRow = snapshot.docs.find(d => d.id === id);
      const oldData = oldRow.data();

      const newName = prompt("Tên xe mới:", oldData.name);
      const newPrice = prompt("Giá xe mới:", oldData.price.replace(" ₫","").replace(/\./g,""));
      if (!newName || !newPrice) return;

      const carRef = doc(db, "cars", id);
      await updateDoc(carRef, {
        name: newName,
        price: parseInt(newPrice).toLocaleString("vi-VN") + " ₫",
      });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (confirm("Bạn có chắc muốn xóa xe này không?")) {
        await deleteDoc(doc(db, "cars", id));
      }
    });
  });
});
// ✅ Logic Popup
    const buyPopup = document.getElementById("buy-popup");
    const closeBtn = document.querySelector(".close-btn");
    const popupCarName = document.getElementById("popup-car-name");
    const buyForm = document.getElementById("buyForm");

    // Lắng nghe sự kiện click cho tất cả nút "Đặt mua ngay"
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('buy-btn')) {
            const carName = e.target.getAttribute('data-car-name');
            popupCarName.textContent = carName; // Cập nhật tên xe
            buyPopup.style.display = "block";
            // Lưu tên xe vào form data (tùy chọn)
            buyForm.setAttribute('data-current-car', carName);
        }
    });

    // Đóng popup khi click vào X
    if (closeBtn) {
        closeBtn.onclick = function() {
            buyPopup.style.display = "none";
            buyForm.reset();
        }
    }

    // Đóng popup khi click ra ngoài
    window.onclick = function(event) {
        if (event.target == buyPopup) {
            buyPopup.style.display = "none";
            buyForm.reset();
        }
    }

    // Xử lý Form Xác nhận
    buyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const carName = buyForm.getAttribute('data-current-car');
        const name = document.getElementById("buyerName").value.trim();
        const email = document.getElementById("buyerEmail").value.trim();

        if (name && email) {
            alert(`✅ Đặt mua thành công! Xe: ${carName}. Tên: ${name}. Email: ${email}. Chúng tôi sẽ liên hệ với bạn sớm!`);
            buyPopup.style.display = "none";
            buyForm.reset();
        } else {
            alert("Vui lòng nhập đầy đủ Tên và Email.");
        }
    });
