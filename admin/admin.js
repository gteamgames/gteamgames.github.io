import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config (same one)
const firebaseConfig = {
  apiKey: "AIzaSyDuDxk-h-FQoySDWuiMYipNZSJpBv86-dY",
  authDomain: "gteam-games.firebaseapp.com",
  projectId: "gteam-games",
  storageBucket: "gteam-games.firebasestorage.app",
  messagingSenderId: "858344818483",
  appId: "1:858344818483:web:b011f0df755d34b049e046"
};

const ADMIN_EMAIL = "gteamgamesofficial@gmail.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 HARD GATE
onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "/";
    return;
  }

  loadUsers();
});

async function loadUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users"));

  snapshot.forEach(doc => {
    const u = doc.data();
    const li = document.createElement("li");
    li.textContent = `${u.email} — role: ${u.role || "user"}`;
    list.appendChild(li);
  });
}
