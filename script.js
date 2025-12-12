const addButton = document.getElementById("addBtn");
const input = document.getElementById('taskInput');
const ul = document.getElementById("taskList");
const clearButton = document.getElementById("clearBtn");
const compteur = document.getElementById("compteur");

const localData = localStorage.getItem("tasks");
let tasks = localData ? JSON.parse(localStorage.getItem("tasks")) : [];

const update = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

const render = () => {
    ul.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.style.margin = "3px 10px";

        //suppression basé sur l'index

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            update();
        });

        li.addEventListener("dblclick", () => {
            const createInput = document.createElement("input");
            createInput.type = "text";
            createInput.value = task;
            
            li.textContent = "";
            li.appendChild(createInput);

            createInput.addEventListener("keydown", (e) => {
                if(e.key === "Enter") {
                    task = createInput.value;
                    li.textContent = createInput.value;
                }
            });
        });

        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
    compteur.textContent = `${tasks.length} tâches restantes`;
};

addButton.addEventListener("click", () => {
    if(input.value.trim()) {
        tasks.push(input.value);
        input.value = "";
        update();
    }
});

clearButton.addEventListener("click", () => {
    tasks = [];
    update();
})

render();