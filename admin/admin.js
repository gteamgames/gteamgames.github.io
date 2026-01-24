import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

const ADMIN_EMAIL = "gteamgamesofficial@gmail.com";
const usersDiv = document.getElementById("users");

// 🔒 Auth check
onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "/";
    return;
  }

  // ✅ Admin confirmed → load users
  const snap = await getDocs(collection(db, "users"));

  snap.forEach(doc => {
    const u = doc.data();

    const div = document.createElement("div");
    div.className = "user";
    div.innerHTML = `
      <strong>${u.email}</strong>
      <span>Role: ${u.role}</span>
    `;
    usersDiv.appendChild(div);
  });
});

