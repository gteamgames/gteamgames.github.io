// auth.js — GTeam Games (FINAL FIXED VERSION)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuDxk-h-FQoySDWuiMYipNZSJpBv86-dY",
  authDomain: "gteam-games.firebaseapp.com",
  projectId: "gteam-games",
  storageBucket: "gteam-games.firebasestorage.app",
  messagingSenderId: "858344818483",
  appId: "1:858344818483:web:b011f0df755d34b049e046",
  measurementId: "G-JWVJ20PBM0"
};
// auth.js — CLEAN & WORKING

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuDxk-h-FQoySDWuiMYipNZSJpBv86-dY",
  authDomain: "gteam-games.firebaseapp.com",
  projectId: "gteam-games",
  storageBucket: "gteam-games.firebasestorage.app",
  messagingSenderId: "858344818483",
  appId: "1:858344818483:web:b011f0df755d34b049e046"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ⏳ WAIT for DOM (THIS IS KEY)
window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const userMenu = document.getElementById("user-menu");
  const username = document.getElementById("username");

  if (!loginBtn || !userMenu) {
    console.warn("Auth elements missing");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    console.log("Auth state:", user);

    if (user) {
      loginBtn.style.display = "none";
      userMenu.style.display = "flex";
      if (username) {
        username.textContent = user.email.split("@")[0];
      }
    } else {
      loginBtn.style.display = "inline-block";
      userMenu.style.display = "none";
    }
  });
});

// 🚪 Logout
window.logout = () => {
  signOut(auth).then(() => {
    location.reload();
  });
};


// 🚪 Logout
window.logout = () => {
  signOut(auth);
};
