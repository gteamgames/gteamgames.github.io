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

// 🚀 Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🎯 Elements (may not exist on all pages)
const loginBtn = document.getElementById("login-btn");
const userMenu = document.getElementById("user-menu");
const username = document.getElementById("username");

// 👁️ Auth state watcher + AUTO-ADD EXISTING USERS
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // 🔄 Auto-add existing users to Firestore
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: user.email,
        role: "user",
        createdAt: Date.now()
      });
    }

    // UI update
    if (loginBtn) loginBtn.style.display = "none";
    if (userMenu) userMenu.style.display = "flex";
    if (username) username.textContent = user.email.split("@")[0];
  } else {
    if (loginBtn) loginBtn.style.display = "block";
    if (userMenu) userMenu.style.display = "none";
  }
});

// 🔑 Login
window.login = async () => {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) return alert("Missing email or password");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/";
  } catch (err) {
    alert(err.message);
  }
};

// ✍️ Signup (NEW USERS)
window.signup = async () => {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) return alert("Missing email or password");

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: email,
      role: "user",
      createdAt: Date.now()
    });

    window.location.href = "/";
  } catch (err) {
    alert(err.message);
  }
};

// 🚪 Logout
window.logout = () => {
  signOut(auth);
};
