/*
<div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
            <div class="card-header">Formulario Tareas</div>
            <div class="card-body">
                <form id="task-form">
                    <input type="text" id="task-title" class="form-control" placeholder="Título de la tarea"
                        autofocus>
                    <textarea id="task-description" class="form-control" placeholder="Descripción de la tarea" cols="10"
                        rows="5"></textarea>
                    <br>

                    <input type="submit" value="Agregar Tarea" class="btn btn-lg btn-primary" id="task-button">

                </form> 

*/

function editCard(){
    
}



function createTask(action) {
    let getMainDiv = document.getElementById("mainCont"); // get mainCont to paint inside

    // <div class="card text-white bg-info mb-6  offset-md-4" style="max-width: 20rem;">
    let newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("card", "text-white",  "bg-info", "mb-6", "offset-md-4");
    newTaskContainer.style = "max-width: 20rem;"
    getMainDiv.appendChild(newTaskContainer);

        //<div class="card-header">Formulario Tareas</div>
        let newTaskHeader = document.createElement("div");
        newTaskHeader.classList.add("card-header");
        let headerTxt = document.createElement("p");
        headerTxt.innerText = "Formulario Tareas";
        newTaskHeader.appendChild(headerTxt);

        getMainDiv.appendChild(newTaskHeader);

        // <div class="card-body">
        let newTaskBody = document.createElement("div");
        newTaskBody.classList.add("card-body");
        getMainDiv.appendChild(newTaskBody);

            //<form id="task-form">
            let taskBodyForm = document.createElement("form");
            taskBodyForm.id = action;
            getMainDiv.appendChild(taskBodyForm);

                //<input type="text" id="task-title" class="form-control" placeholder="Título de la tarea" autofocus>
                let tituloInput = document.createElement("input");
                tituloInput.type = "text";
                tituloInput.id = "task-title";
                tituloInput.classList.add("form-control");
                tituloInput.placeholder = "Título de la tarea";
                tituloInput.autofocus = true;
                getMainDiv.appendChild(tituloInput);

                    //<textarea id="task-description" class="form-control" placeholder="Descripción de la tarea" cols="10"rows="5"></textarea>
                    let tituloTA = document.createElement("textarea");
                    tituloTA.id = "task-description";
                    tituloTA.classList.add("form-control");
                    tituloTA.placeholder = "Descripción de la tarea";
                    tituloTA.cols = "10";
                    tituloTA.rows = "5";
                    getMainDiv.appendChild(tituloTA);

                        //<br>
                        let br = document.createElement("br");
                        getMainDiv.appendChild(br);

                            //<input type="submit" value="Agregar Tarea" class="btn btn-lg btn-primary" id="task-button">
                            let inputSubmit = document.createElement("input");
                            inputSubmit.type = "submit";
                            inputSubmit.value = action;
                            inputSubmit.classList.add("btn","btn-lg","btn-primary");
                            inputSubmit.id ="task-button";
                            getMainDiv.appendChild(inputSubmit);

                            
    ;};

// function paintNewTask(){
//     let newTaskContainer = document.createElement("div");
//     newTaskContainer.classList.add("card text-white bg-info mb-6 offset-md-4");
//     newTaskContainer.style = "max-width: 20rem;"

//     let getMainDiv = document.getElementById("mainCont");
//     getMainDiv.appendChild(newTaskContainer);
// }