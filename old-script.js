const addButton = document.getElementById("addBtn");
const input = document.getElementById('taskInput');
const ul = document.getElementById("taskList");
const clearButton = document.getElementById("clearBtn");

// Restauration au chargement


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// let tasks = [];

// const table = localStorage.getItem("tasks");
// if(table) {
//     tasks = JSON.parse(table);
// }

render();

// Ajouter une tâche (sans persistance)
addButton.addEventListener("click", () => {
    if(input.value) {
        tasks.push(input.value);
        console.log(tasks);
    }
    render()
});

// Affichage + sauvegarde
function render() {
    ul.innerHTML = "";

    tasks.forEach(liste => {
        const li = document.createElement("li");
        li.textContent = liste;

        // Création du boutton supprimer une tâche
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Supprimer";
        deleteButton.style.margin = "5px 10px";

        // Supprimer l'élément du tableau tasks
        deleteButton.addEventListener("click", () => {
            const index = tasks.indexOf(liste);

            if(index !== -1) {
                tasks.splice(index, 1);
                console.log(tasks);
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
            render();
        });

        // Vider toute la liste
        clearButton.addEventListener("click", () => {
            tasks = [];
            localStorage.removeItem("tasks");
            render()
        });

        // ajout du bouton dans chaque li
        li.appendChild(deleteButton);
        ul.appendChild(li);

        // Sauvegarder la liste
        const result = JSON.stringify(tasks);
        localStorage.setItem('tasks', result);
    });
}
render();

