//Me traigo mi db firestore
import { getTasks, insertTask } from "./utils.js"; // Agregado updateTask
import { showEdit, eraseTask, setVisibility, readForms } from "./functions.js"
//console.log(db);
//Extraigo todos los documentos de tasks y creo tarjetas con ellos

insertTask({})

await getTasks();

window.showEdit = showEdit
window.eraseTask = eraseTask
window.setVisibility = setVisibility
window.readForms = readForms