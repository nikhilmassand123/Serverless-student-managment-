import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR6iUj2uf3RxMbvDF3p2eKQ3OksTQ_ScY",
  authDomain: "student-management-syste-6c936.firebaseapp.com",
  projectId: "student-management-syste-6c936",
  storageBucket: "student-management-syste-6c936.firebasestorage.app",
  messagingSenderId: "649236857524",
  appId: "1:649236857524:web:eb2483c052046550b5cde1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

  if (user) {
    window.location.href = "index.html";
  }
});

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

registerBtn.addEventListener("click", async () => {

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Registration Successful");

  } catch (error) {

    alert(error.message);
  }
});

loginBtn.addEventListener("click", async () => {

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful");

    window.location.href =
    "index.html";

  } catch (error) {

    alert(error.message);
  }
});