function adicionarTarefa() {
    let addTarefa = document.getElementById("addTarefa");
    let listaTarefas = document.getElementById("listaTarefas");
    let Tarefa = addTarefa.value;
    
    // reconhece a tarefa como concluida quando a checkbox é marcada
    if (Tarefa.trim() !== "") {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.classList.add("completo");
            } else {
                li.classList.remove("completo");
            }
        });
        
        let span = document.createElement("span");
        span.textContent = Tarefa;
        
        // botão de editar tarefa
        let editButton = document.createElement("button");
        editButton.innerHTML = "&#9998";
        editButton.classList.add("editar"); //classe para botao
        editButton.addEventListener("click", function() {
            let newText = prompt("Editar tarefa:", span.textContent);
            if (newText !== null) {
                span.textContent = newText;
            }
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        listaTarefas.appendChild(li);
        addTarefa.value = "";
    } else {
        alert("Por favor, insira uma tarefa!");
    }
}

// remover as tarefas concluidas
function removerTarefa() {
    let listaTarefas = document.getElementById("listaTarefas");
    let completoTasks = listaTarefas.querySelectorAll(".completo");
    
    completoTasks.forEach(function(task) {
        task.remove();
    });
}
