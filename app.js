import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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

// Replace with your API Gateway URL
const API_URL =
    "https://tiynod9476.execute-api.ap-south-1.amazonaws.com";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");
const logoutBtn = document.getElementById("logoutBtn");

// ADD STUDENT
addBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const course = document.getElementById("course").value;

    if (!name || !roll || !course) {
        alert("Please fill all fields");
        return;
    }

    try {

        await fetch(`${API_URL}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: roll,
                name: name,
                email: `${roll}@student.com`,
                course: course
            })
        });

        document.getElementById("name").value = "";
        document.getElementById("roll").value = "";
        document.getElementById("course").value = "";

        alert("Student Added Successfully");
        loadStudents();

    } catch (error) {
        console.error(error);
        alert("Error adding student");
    }
});


// LOAD STUDENTS
async function loadStudents() {

    studentList.innerHTML = "";

    try {

        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();

        students.forEach(student => {

            studentList.innerHTML += `
                <div class="student-card">
                    <h3>${student.name}</h3>
                    <p><strong>Roll:</strong> ${student.studentId}</p>
                    <p><strong>Course:</strong> ${student.course}</p>

                    <button onclick="editStudent('${student.studentId}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.studentId}')">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
        alert("Error loading students");
    }
}


// DELETE STUDENT
window.deleteStudent = async (studentId) => {

    const confirmDelete = confirm("Delete this student?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_URL}/students/${studentId}`, {
            method: "DELETE"
        });

        alert("Student Deleted Successfully");
        loadStudents();

    } catch (error) {
        console.log(error);
        alert("Error deleting student");
    }
};


// UPDATE STUDENT
window.editStudent = async (studentId) => {

    const newName = prompt("Enter new name");
    const newCourse = prompt("Enter new course");

    if (!newName || !newCourse) return;

    try {

        await fetch(`${API_URL}/students`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: studentId,
                name: newName,
                email: `${studentId}@student.com`,
                course: newCourse
            })
        });

        alert("Student Updated Successfully");
        loadStudents();

    } catch (error) {
        console.log(error);
        alert("Error updating student");
    }
};


// LOGOUT
logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    alert("Logged Out Successfully");

    window.location.href = "login.html";
});


// LOAD DATA WHEN PAGE OPENS
loadStudents();
