// Criar a checkbox 
function criarCheckbox(completa, li) {  //Completa indica status e li onde sera adicionada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completa; //Ao marcar a checkbox altera o status para completa
    checkbox.addEventListener("change", function() { //Altera a classe do li para compeleto
        li.classList.toggle("completo", checkbox.checked); 
        salvarTarefas(); //Salva a checkbox e seu status
    });
    return checkbox;
}

// Botão de edição
function criarBotaoEdicao(textContent, onClickCallback) { //Texto do botão e função executada quando clica
    const editButton = document.createElement("button");
    editButton.innerHTML = textContent;
    editButton.classList.add("editar"); //Define a classe como editar
    editButton.addEventListener("click", onClickCallback); //Executa função quando é clicado
    return editButton; 
}

// Adicionar tarefa
function adicionarTarefa() {
    const addTarefa = document.getElementById("addTarefa"); //Texto da nova tarefa como addTarefa
    const tarefaTexto = addTarefa.value.trim();

    if (tarefaTexto !== "") { //Se o texto tiver algum conteúdo adiciona uma ttarefa 
        alert("Tarefa adicionada com sucesso!");
        const listaTarefas = document.getElementById("listaTarefas");
        const li = document.createElement("li");

        const checkbox = criarCheckbox(false, li); //Cria uma checkbox desmarcada para itens novos

        const span = document.createElement("span"); //Cria elemento HTML com a constante span
        span.textContent = tarefaTexto; //Adiciona tarefa em área da pagina 

        const editButton = criarBotaoEdicao("&#9998", function() { //Adiciona o botão de edição de texto para itens novos
            const novoTexto = prompt("Editar tarefa:", span.textContent); //Caixa de diálogo para digiar novo texto (edição)
            if (novoTexto !== null) { //Verifica se o novo texto não é nulo
                span.textContent = novoTexto; //Atualiza tarefa na lista após edição
                salvarTarefas();
            }
        });

        //Adiciona a checkbox, botão de edição e carregamento de item em todos os itens adicionados
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        listaTarefas.appendChild(li);
        addTarefa.value = ""; //Limpa o campo de digitação de novas tarefas

        salvarTarefas();
    } else { //Caso não tenha conteúdo digitado ao inserir tarefas apresenta o alerta
        alert("Por favor, insira uma tarefa!");
    }
}

//Ocultar concluídas
function ocultarTarefasConcluidas() {
    const completoTasks = document.querySelectorAll("#listaTarefas .completo"); //seleciona todos os elementos com classe completo dentro da lista de tarefas
    completoTasks.forEach(task => { //Para cada tarefa completa altera sua exibixão para none (oculta)
        task.style.display = "none";
    });
    salvarEstadoOculto(); //Salva o status e armazena
    alert("Tarefas concluídas foram ocultas com sucesso!");
}

// Mostrar tarefas ocultas
function mostrarOcultas() {
    const ocultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || []; //Coleta as tarefas ocultas do local storage
    const listaTarefas = document.getElementById("listaTarefas");
    const itensLista = listaTarefas.querySelectorAll("li");

    itensLista.forEach(item => {  //Para cada item (tarefa)verifica se esa na lista de tarefas ocultas
        const span = item.querySelector("span");
        if (span && ocultas.includes(span.textContent)) { //Se tiver tarefa oculta
            item.style.display = "block"; //Mostra o item com o comando block

            // Sincroniza checkbox com o estado de conclusão da tarefa
            const checkbox = item.querySelector("input[type='checkbox']");//Seleciona o input checkbox para encontrar o elemeno desejado
            const completo = ocultas.some(texto => texto === span.textContent); //Verifica se a tarefa esta nas ocultas (texto da atual igual ao da oculta)
            checkbox.checked = completo; //Quando a checkbox é marcada a tarefa muda para completo
            if (completo) { //Se for marcado como completo adiciona a classe completo
                item.classList.add("completo");
            } else { //Se não for marcado remove a classe completo
                item.classList.remove("completo");
            }
        }
    });
    alert("Tarefas ocultas foram mostradas com sucesso!");
}

//Salvar o estado oculto das tarefas
function salvarEstadoOculto() {
    const ocultas = [];
    const tarefas = document.querySelectorAll("#listaTarefas li"); //Coleta todas as tarefas da lista
    tarefas.forEach(tarefa => { //Para cada tarefa oculta adiciona seu conteúdo na lista de ocultas
        if (tarefa.style.display === "none") {
            ocultas.push(tarefa.querySelector("span").textContent); //Push salva o esado oculto no local storage
        }
    });
    localStorage.setItem("tarefasOcultas", JSON.stringify(ocultas)); //Armazena oculttas no local storage, transforma em string para compatibilidade com navegador e adiciona armazenamento com chave tarefasOcultas
}

//Carregar o estado oculto
function carregarEstadoOculto() {
    const ocultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || []; //Coleta todas as tarefas ocultas
    const listaTarefas = document.getElementById("listaTarefas"); //Elemento que exibe as listas
    const itensLista = listaTarefas.querySelectorAll("li"); //Selecionando todos os elementos dentro da lista

    itensLista.forEach(item => { //Para cada item na lista verifica se esta na lista de tarefas ocultas 
        const span = item.querySelector("span");
        if (span && ocultas.includes(span.textContent)) { //Se estiver, oculta
            item.style.display = "none";
        }
    });
}


//Salvar as tarefas no localStorage
function salvarTarefas() { 
    const tarefas = [];
    const listaTarefas = document.getElementById("listaTarefas");
    listaTarefas.querySelectorAll("li").forEach(item => { //Para cada item da lista obtém seu conteúdo e seu status
        const tarefaTexto = item.querySelector("span").textContent;
        const isCompleta = item.classList.contains("completo");
        tarefas.push({ texto: tarefaTexto, completa: isCompleta }); //cria objeo para persisir no 'tarefas' do local sorage
    });
    localStorage.setItem('listaTarefas', JSON.stringify(tarefas)); //transforma em string para realizar o salvamento no local storage
}

// Carregar as tarefas ao iniciar
function carregarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas");
    const tarefasSalvas = JSON.parse(localStorage.getItem('listaTarefas')) || []; //Obtém tarefas salvas no local storage 
    const ocultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || []; //Obtém tarefas ocultas no local storage

    tarefasSalvas.forEach(tarefa => { //Para cada tarefa, cria um elemento com checkbox, texto e botão de edição (assim como é feito no addTarefa)
        const li = document.createElement("li");
        const checkbox = criarCheckbox(tarefa.completa, li); //Apresentar o status da tarefa, com tarefa.completa verifica se foi concluida
        const span = document.createElement("span");
        span.textContent = tarefa.texto;
        const editButton = criarBotaoEdicao("&#9998", function() {
            const novoTexto = prompt("Editar tarefa:", span.textContent);
            if (novoTexto !== null) {
                span.textContent = novoTexto;
                salvarTarefas();
            }
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        listaTarefas.appendChild(li);

        if (ocultas.includes(tarefa.texto)) {
            li.style.display = "none";
        }
    });
}


document.addEventListener("DOMContentLoaded", function() { //Quando o HTML do documento é completamente analisado 
    carregarTarefas();
});
