// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'; // Agregado updateDoc

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZK6ATks-r1CGl-aAmfJqAa2EbVNZ5LLo",
    authDomain: "crud-dba47.firebaseapp.com",
    projectId: "crud-dba47",
    storageBucket: "crud-dba47.firebasestorage.app",
    messagingSenderId: "89597684928",
    appId: "1:89597684928:web:0e5937692c08f2e0a95125"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        createCard(doc.id, doc.data());
    });
}

function createCard(id, task) {
    const principalDiv = document.createElement('div');
    principalDiv.setAttribute("class", "card bg-light mb-3");
    principalDiv.style = "max-width: 20rem;";
    principalDiv.setAttribute("name", id);

    const headerDiv = document.createElement('div');
    const contentDiv = document.createTextNode("Id: " + id);
    headerDiv.setAttribute("class", "card-header");
    headerDiv.appendChild(contentDiv);
    principalDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement('div');
    const pTitle = document.createElement("p");
    const pTitleText = document.createTextNode("Title: " + task.title);
    const hr = document.createElement('hr');
    const pDesc = document.createElement("p");
    const pDescText = document.createTextNode("Description: " + task.description);

    pTitle.appendChild(pTitleText);
    bodyDiv.appendChild(pTitle);
    bodyDiv.appendChild(hr);
    pDesc.appendChild(pDescText);
    bodyDiv.appendChild(pDesc);
    bodyDiv.appendChild(hr);

    const input = document.createElement("input");
    input.type = "button";
    input.value = "Borrar Tarea";
    input.setAttribute("name", "delete");
    input.setAttribute("id", id);
    bodyDiv.appendChild(input);

    principalDiv.appendChild(bodyDiv);
    document.body.appendChild(principalDiv);
    const br = document.createElement("br");
    document.body.appendChild(br);
}

function generateRandomIdTask(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function insertTask(task) {
    await setDoc(doc(db, "tasks", generateRandomIdTask(20)), task);
    alert("Insertada la tarea: " + task.title);
}

export async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    alert("Borrada la tarea: " + id);
}

export async function updateTask(task) {            // Creada función para update de tasks.
    const taskToUpdate = doc(db, "tasks", task.id);

    await updateDoc(taskToUpdate, {
        title: task.title,
        description: task.description
    });
    alert("Editada la tarea: " + task.id);
}