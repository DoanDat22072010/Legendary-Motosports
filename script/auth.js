// import các module từ Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Cấu hình Firebase của bạn (copy từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyABalL-liOEB5174fDeJ0OWNrg_xfA1APU",
  authDomain: "legendary-motosports-864b3.firebaseapp.com",
  projectId: "legendary-motosports-864b3",
  storageBucket: "legendary-motosports-864b3.firebasestorage.app",
  messagingSenderId: "960257570446",
  appId: "1:960257570446:web:81bfc9a97664bd422a3bdf",
  measurementId: "G-4XRBSRC96D"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ====== Xử lý Đăng ký ======
// ====== Xử lý Đăng ký (PHIÊN BẢN ĐÃ CẬP NHẬT) ======
const registerForm = document.getElementById("register-form"); //
if (registerForm) { //
  registerForm.addEventListener("submit", async (e) => { //
    e.preventDefault(); //
    const email = document.getElementById("register-email").value; //
    const password = document.getElementById("register-password").value; //
    // ✅ THAY ĐỔI: Lấy giá trị từ trường nhập lại mật khẩu
    const confirmPassword = document.getElementById("register-confirm-password").value; //

    // ✅ THAY ĐỔI: Thêm điều kiện kiểm tra mật khẩu
    if (password !== confirmPassword) { //
      alert("Lỗi đăng ký: Mật khẩu và Nhập lại Mật khẩu không khớp."); //
      return; // Dừng lại nếu không khớp //
    }

    try { //
      await createUserWithEmailAndPassword(auth, email, password); //
      alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ."); //
      window.location.href = "login.html"; //
    } catch (error) { //
      alert("Lỗi đăng ký: " + error.message); //
    }
  }); //
} //

// ====== Xử lý Đăng nhập ======
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Lỗi đăng nhập: " + error.message);
    }
  });
}

// ====== Đăng xuất (nếu có nút logout) ======
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

// ====== Kiểm tra trạng thái đăng nhập ======
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Đã đăng nhập:", user.email);
  } else {
    console.log("Chưa đăng nhập");
  }
});
