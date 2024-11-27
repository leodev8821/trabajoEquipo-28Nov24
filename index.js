
    //Me traigo mi db firestore
    import { getTasks, insertTask, deleteTask, updateTask} from "./utils.js"; // Agregado updateTask
    //console.log(db);
    //Extraigo todos los documentos de tasks y creo tarjetas con ellos
    await getTasks();


    //Obtenemos el form y capturamos el submit
    const form = document.getElementById("task-form");
    const updateForm = document.getElementById("update-task-form"); // agregado para obtener el form del update


    updateForm.addEventListener("submit", e =>{                     // agregado para recoger los datos del form del update.
        e.preventDefault();
        const task = {
            id: updateForm["update-task-id"].value,
            title: updateForm["update-task-title"].value,
            description: updateForm["task-description"].value
        }
        console.log(task);
        updateTask(task);
    })

    form.addEventListener("submit", e => {
        e.preventDefault();
        const task = {
            title: form["task-title"].value,
            description: form["task-description"].value
        }

        insertTask(task);
    })


    const buttonsCardD = document.getElementsByName("delete");
    buttonsCardD.forEach(element => {
        element.addEventListener("click",  () => {
            var divDelete = element.parentNode.parentNode;
            document.body.removeChild(divDelete);
            //console.log("Estoy borrando la tarea: "+element.id);
            deleteTask(element.id);
        })
    });
