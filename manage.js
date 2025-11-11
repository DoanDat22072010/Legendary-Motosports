// manage.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// cấu hình Firebase (giữ nguyên của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyABalL-liOEB5174fDeJ0OWNrg_xfA1APU",
  authDomain: "legendary-motosports-864b3.firebaseapp.com",
  projectId: "legendary-motosports-864b3",
  storageBucket: "legendary-motosports-864b3.firebasestorage.app",
  messagingSenderId: "960257570446",
  appId: "1:960257570446:web:81bfc9a97664bd422a3bdf",
  measurementId: "G-4XRBSRC96D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const xeCollection = collection(db, "xe");

// DOM
const ten = document.getElementById('ten');
const loai = document.getElementById('loai');
const gia = document.getElementById('gia');
const moTa = document.getElementById('moTa');
const linkAnh = document.getElementById('linkAnh');
const btnLuu = document.getElementById('btnLuu');
const btnHuy = document.getElementById('btnHuy');
const xeTable = document.getElementById('xeTable');

let idDangSua = null;

// helper: reset form
function resetForm() {
  ten.value = loai.value = gia.value = moTa.value = linkAnh.value = "";
  idDangSua = null;
  btnLuu.textContent = "Lưu";
  btnHuy.style.display = "none";
}

// tạo 1 hàng bảng an toàn (không dùng innerHTML chèn dữ liệu người dùng)
function createRow(id, data) {
  const tr = document.createElement('tr');

  const tdTen = document.createElement('td');
  tdTen.textContent = data.ten || '';
  tr.appendChild(tdTen);

  const tdLoai = document.createElement('td');
  tdLoai.textContent = data.loai || '';
  tr.appendChild(tdLoai);

  const tdGia = document.createElement('td');
  tdGia.textContent = data.gia || '';
  tr.appendChild(tdGia);

  const tdAction = document.createElement('td');

  const btnEdit = document.createElement('button');
  btnEdit.className = 'btn btn-warning btn-sm me-2';
  btnEdit.textContent = 'Sửa';
  btnEdit.addEventListener('click', () => {
    idDangSua = id;
    ten.value = data.ten || '';
    loai.value = data.loai || '';
    gia.value = data.gia || '';
    moTa.value = data.moTa || '';
    linkAnh.value = data.linkAnh || '';
    btnLuu.textContent = "Cập nhật";
    btnHuy.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn btn-danger btn-sm';
  btnDelete.textContent = 'Xoá';
  btnDelete.addEventListener('click', async () => {
    if (confirm("❌ Bạn có chắc muốn xoá xe này?")) {
      try {
        await deleteDoc(doc(db, "xe", id));
        alert("✅ Đã xoá xe thành công!");
      } catch (err) {
        console.error("Lỗi khi xoá:", err);
        alert("❌ Lỗi xoá. Kiểm tra console.");
      }
    }
  });

  tdAction.appendChild(btnEdit);
  tdAction.appendChild(btnDelete);
  tr.appendChild(tdAction);

  return tr;
}

// render toàn bộ danh sách từ snapshot
function renderXe(snapshot) {
  xeTable.innerHTML = ""; // xóa cũ
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = createRow(docSnap.id, data);
    xeTable.appendChild(row);
  });
}

// lắng nghe realtime
onSnapshot(xeCollection, (snapshot) => {
  renderXe(snapshot);
});

// lưu (thêm / cập nhật)
btnLuu.addEventListener('click', async () => {
  const data = {
    ten: ten.value.trim(),
    loai: loai.value.trim(),
    gia: gia.value.trim(),
    moTa: moTa.value.trim(),
    linkAnh: linkAnh.value.trim()
  };

  // validation cơ bản
  if (!data.ten || data.ten.length < 2) {
    alert("⚠️ Tên xe phải có ít nhất 2 ký tự.");
    return;
  }
  if (!data.gia) {
    alert("⚠️ Vui lòng nhập giá xe.");
    return;
  }

  try {
    if (idDangSua) {
      const ref = doc(db, "xe", idDangSua);
      await updateDoc(ref, data);
      alert("✅ Đã cập nhật xe thành công!");
    } else {
      await addDoc(xeCollection, data);
      alert("✅ Đã thêm xe mới thành công!");
    }
    resetForm();
  } catch (error) {
    console.error("Lỗi khi lưu:", error);
    alert("❌ Đã xảy ra lỗi khi lưu dữ liệu.");
  }
});

// huỷ sửa
btnHuy.addEventListener('click', () => {
  resetForm();
});

// init
resetForm();
