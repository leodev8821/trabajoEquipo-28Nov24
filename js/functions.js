import { deleteTask, updateTask, insertTask } from "./utils.js";

function showEdit(id, title, description) {
    setVisibility("editMode");
    let getForm = document.getElementById("editCont");
    getForm.innerHTML = "";
    
    let closeButton = document.createElement("input");
    closeButton.type = "button";
    closeButton.setAttribute("onclick", "setVisibility('standardMode')");
    closeButton.value ="Volver";
    getForm.appendChild(closeButton);

    createTask("EditTask", "editCont", id, "update");

    addValues(title, description)
}

function addValues(taskTitle, taskDescription){
    let title = document.querySelector("#editCont #task-title");
    let description = document.querySelector("#editCont #task-description");
    title.value = taskTitle;
    description.value = taskDescription;
}

function setVisibility(form){
    let mainDiv = document.getElementById("mainCont");
    let editDiv = document.getElementById("editCont");
    switch(form){
        case "editMode":
            mainDiv.className = "oculto";
            editDiv.className = "visible";
            break;
        case "standardMode":
            mainDiv.className = "visible";
            editDiv.className = "oculto";
            break;
        default:
            break;
    }
}

/**
 * Funcion para crear una nueva tarea
 * @param {number} id - Id de la tarea actual
 * @param {Object} task - Tarea que se quiere modificar
 */
function taskCard(id, task) {

    let mainCont = document.getElementById('mainCont');

    const principalDiv = document.createElement('div');
    principalDiv.setAttribute("class", "card bg-light mb-3");
    principalDiv.style = "max-width: 20rem;";
    principalDiv.setAttribute("name", id);
    principalDiv.setAttribute("id", id);

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

    const divButton = document.createElement('div');
    divButton.classList.add('divButton');
    bodyDiv.appendChild(divButton);

    const input = document.createElement("input");
    input.type = "button";
    input.value = "Borrar Tarea";
    input.setAttribute("name", "delete");
    input.setAttribute("id", id);
    input.setAttribute("onClick", `eraseTask("${id}")`);
    divButton.appendChild(input);

    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "Editar Tarea";
    editButton.setAttribute("name", "edit");
        //inputSubmit.setAttribute(`onclick`, `readForms("${id}", "${form}")`)

    editButton.setAttribute("onclick", `showEdit('${id}', '${task.title}', '${task.description}')`);
    divButton.appendChild(editButton);

    principalDiv.appendChild(bodyDiv);

    bodyDiv.appendChild(divButton);

    mainCont.appendChild(principalDiv)

    const br = document.createElement("br");


    document.body.appendChild(br);

}

function createTask(action, container, id, form) {
    let getMainDiv = document.getElementById(container); // get mainCont to paint inside

    const taskTitle = document.createElement('h3');
    taskTitle.innerHTML = "Tareas existentes"
    getMainDiv.appendChild(taskTitle);

    let cardBlg = document.createElement("div");
    cardBlg.id = "formContainer";
    cardBlg.setAttribute("class", "card bg-light mb-3");
    cardBlg.style = "max-width: 20rem;";    // <div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
    getMainDiv.appendChild(cardBlg);

    //<div class="card-header">Formulario Tareas</div>
    let newTaskHeader = document.createElement("div");
    newTaskHeader.classList.add("card-header");
    newTaskHeader.id = "formEdit";
    let headerTxt = document.createElement("p");
    headerTxt.innerText = "Formulario Tareas";
    newTaskHeader.appendChild(headerTxt);

    cardBlg.appendChild(newTaskHeader);

    //<form id="task-form">
    let taskBodyForm = document.createElement("form");
    taskBodyForm.id = action;
    cardBlg.appendChild(taskBodyForm);

    //<input type="text" id="task-title" class="form-control" placeholder="Título de la tarea" autofocus>
    let tituloInput = document.createElement("input");
    tituloInput.type = "text";
    tituloInput.id = "task-title";
    tituloInput.classList.add("form-control");
    tituloInput.placeholder = "Título de la tarea";
    tituloInput.autofocus = true;
    taskBodyForm.appendChild(tituloInput);

    //<textarea id="task-description" class="form-control" placeholder="Descripción de la tarea" cols="10"rows="5"></textarea>
    let tituloTA = document.createElement("textarea");
    tituloTA.id = "task-description";
    tituloTA.classList.add("form-control");
    tituloTA.placeholder = "Descripción de la tarea";
    tituloTA.cols = "10";
    tituloTA.rows = "5";
    taskBodyForm.appendChild(tituloTA);

    //<br>
    let br = document.createElement("br");
    taskBodyForm.appendChild(br);

    //<input type="submit" value="Agregar Tarea" class="btn btn-lg btn-primary" id="task-button">
    let inputSubmit = document.createElement("input");
    inputSubmit.type = "submit";
    inputSubmit.value = action;
    inputSubmit.classList.add("btn", "btn-lg", "btn-primary");
    inputSubmit.id = "task-button";
    //inputSubmit.setAttribute(`onclick`, `readForms("${id}", "${form}")`)
    taskBodyForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        await readForms(id, form);
    });
    taskBodyForm.appendChild(inputSubmit);

    cardBlg.appendChild(taskBodyForm);  

};

/**
 * Función para ir a la página de que se le pase por parámetro desde el botón 'Finish'
 * @param {string} url - Texto de la url al que se quiere ir
 */
function navigateToHome(url){
    window.location.assign('/html/'+url+".html");
}

async function readForms(id, form) {
    //Obtenemos el form y capturamos el submit

    switch (form) {
        case "update":
            const updateForm = document.getElementById("EditTask");
            // e.preventDefault();
            const taskUpdate = {
                id: id,
                title: updateForm["task-title"].value,
                description: updateForm["task-description"].value
            }
            await updateTask(taskUpdate);
            break;
        case "insert":
            const form = document.getElementById("Add-Task");
            // e.preventDefault();
            const taskInsert = {
                title: form["task-title"].value,
                description: form["task-description"].value
            }
            insertTask(taskInsert);
        default:
            break;
    } 

}

function eraseTask(id){
    const divCardTask = document.getElementById(id);

    divCardTask.remove();
    deleteTask(id);
}



export { taskCard, showEdit, createTask, eraseTask, setVisibility, readForms, navigateToHome }