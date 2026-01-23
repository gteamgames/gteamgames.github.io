// auth.js — GTeam Games

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 YOUR Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuDxk-h-FQoySDWuiMYipNZSJpBv86-dY",
  authDomain: "gteam-games.firebaseapp.com",
  projectId: "gteam-games",
  storageBucket: "gteam-games.firebasestorage.app",
  messagingSenderId: "858344818483",
  appId: "1:858344818483:web:b011f0df755d34b049e046",
  measurementId: "G-JWVJ20PBM0"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements (must exist in HTML)
const loginBtn = document.getElementById("login-btn");
const userMenu = document.getElementById("user-menu");
const username = document.getElementById("username");

// 👁️ Auth state watcher (THIS fixes your broken login button)
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (loginBtn) loginBtn.style.display = "none";
    if (userMenu) userMenu.style.display = "flex";
    if (username) {
      username.textContent = user.email.split("@")[0];
    }
  } else {
    if (loginBtn) loginBtn.style.display = "block";
    if (userMenu) userMenu.style.display = "none";
  }
});

// 🔑 Login
window.login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "/")
    .catch(err => alert(err.message));
};

// ✍️ Signup
window.signup = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "/")
    .catch(err => alert(err.message));
};

// 🚪 Logout
window.logout = () => {
  signOut(auth);
};
