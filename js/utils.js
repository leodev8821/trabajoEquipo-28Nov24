// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { taskCard, createTask,navigateToHome } from "./functions.js"


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
    if(querySnapshot.docs.length != 0){
        let id = querySnapshot.docs[0].id;
        createTask("Add-Task", "mainCont", id, "insert");
        querySnapshot.forEach((doc) => {
            taskCard(doc.id, doc.data());
        });
    }else{
        alert("No tienes tareas")
        createTask("Add-Task", "mainCont", "idPrueba", "insert");
    }
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

/*
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});

*/

export async function insertTask(task) {
    await setDoc(doc(db, "tasks", generateRandomIdTask(20)), task);
    alert("Insertada la tarea: " + task.title);
    navigateToHome("index")
}

export async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    alert("Borrada la tarea: " + id);
}

export async function updateTask(task) {            // Creada función para update de tasks.
    const taskToUpdate = await doc(db, "tasks", task.id);
    await updateDoc(taskToUpdate, {
        title: task.title,
        description: task.description
    });
    alert("Editada la tarea: " + task.id);
    navigateToHome("index")
}