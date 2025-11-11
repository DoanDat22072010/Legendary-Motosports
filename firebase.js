// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Config Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyABalL-liOEB5174fDeJ0OWNrg_xfA1APU",
  authDomain: "legendary-motosports-864b3.firebaseapp.com",
  projectId: "legendary-motosports-864b3",
  storageBucket: "legendary-motosports-864b3.firebasestorage.app",
  messagingSenderId: "960257570446",
  appId: "1:960257570446:web:81bfc9a97664bd422a3bdf",
  measurementId: "G-4XRBSRC96D"
};

// Init app
const app = initializeApp(firebaseConfig);

// Export Auth
const auth = getAuth(app);
export { auth };
