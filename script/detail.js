// ✅ Import Firebase Modular (v10+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, doc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyABalL-liOEB5174fDeJ0OWNrg_xfA1APU",
  authDomain: "legendary-motosports-864b3.firebaseapp.com",
  projectId: "legendary-motosports-864b3",
  storageBucket: "legendary-motosports-864b3.firebasestorage.app",
  messagingSenderId: "960257570446",
  appId: "1:960257570446:web:81bfc9a97664bd422a3bdf",
  measurementId: "G-4XRBSRC96D"
};

// ⚙️ Khởi tạo Firebase + Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const detailContent = document.getElementById("detail-content");

/**
 * 🛠️ Lấy ID xe từ URL (ví dụ: detail.html?id=ABCDEFGHIJ)
 * @returns {string | null} ID của xe
 */
function getCarIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/**
 * 🟢 Tải và hiển thị chi tiết xe
 */
async function loadCarDetail() {
  const carId = getCarIdFromUrl();

  if (!carId) {
    detailContent.innerHTML = `
      <div class="car-detail-card">
        <h2>❌ Lỗi truy vấn</h2>
        <p>Không tìm thấy ID xe trong đường dẫn.</p>
        <a href="index.html" class="btn">Về trang chủ</a>
      </div>
    `;
    return;
  }

  try {
    // 🔍 Truy vấn tài liệu trong collection "xe"
    const carRef = doc(db, "xe", carId); 
    const carSnap = await getDoc(carRef);

    if (carSnap.exists()) {
      const data = carSnap.data();
      
      // ✅ Render chi tiết xe
      detailContent.innerHTML = `
  <section class="detail-container">
    <div class="detail-image">
      <img src="${data.linkAnh || 'https://via.placeholder.com/800x500?text=No+Image'}" alt="${data.ten}">
    </div>

    <div class="detail-info">
      <h2>${data.ten}</h2>
      <p class="car-type">🏁 Loại: <span>${data.loai || 'Không xác định'}</span></p>
      <p class="car-price">💰 Giá: <span>${data.gia || 'Liên hệ'} VNĐ</span></p>
      <p class="car-desc">${data.moTa || 'Chưa có mô tả chi tiết cho chiếc xe này.'}</p>
      
      <div class="detail-buttons">
        <a href="index.html" class="btn btn-back">← Quay lại</a>
        <button class="btn btn-buy">Đặt mua ngay</button>
      </div>
    </div>
  </section>

  <section class="specs">
    <h3>Thông số kỹ thuật</h3>
    <div class="spec-grid">
      <div><b>Động cơ:</b> V8 Twin-Turbo</div>
      <div><b>Công suất:</b> 700 hp</div>
      <div><b>Tốc độ tối đa:</b> 330 km/h</div>
      <div><b>Tăng tốc 0-100 km/h:</b> 2.9 s</div>
      <div><b>Hộp số:</b> 8 cấp tự động</div>
      <div><b>Nhiên liệu:</b> Xăng cao cấp</div>
    </div>
  </section>
`;

      // Tài liệu không tồn tại
      detailContent.innerHTML = `
        <div class="car-detail-card">
          <h2>❌ Xe không tồn tại</h2>
          <p>ID xe "${carId}" không có trong hệ thống.</p>
          <a href="index.html" class="btn">Về trang chủ</a>
        </div>
      `;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu chi tiết xe:", error);
    detailContent.innerHTML = `
      <div class="car-detail-card">
        <h2>❌ Lỗi kết nối</h2>
        <p>Không thể tải dữ liệu. Vui lòng kiểm tra cấu hình Firebase hoặc kết nối mạng.</p>
        <a href="index.html" class="btn">Về trang chủ</a>
      </div>
    `;
  }
}

// 🚀 Khởi động chức năng tải chi tiết
loadCarDetail();

