let amigos = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarListaAmigos();
    input.value = "";
    input.focus();
}

function atualizarListaAmigos() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach(nome => {
        let li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para realizar o sorteio.");
        return;
    }

    let sorteio = {};
    let disponiveis = [...amigos];

    for (let i = 0; i < amigos.length; i++) {
        let amigo = amigos[i];
        let opcoes = disponiveis.filter(nome => nome !== amigo);

        if (opcoes.length === 0) {
            alert("Sorteio inválido! Tentando novamente...");
            return sortearAmigo();
        }

        let sorteado = opcoes[Math.floor(Math.random() * opcoes.length)];
        sorteio[amigo] = sorteado;
        disponiveis = disponiveis.filter(nome => nome !== sorteado);
    }

    exibirResultado(sorteio);
}

function exibirResultado(sorteio) {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Resultado do Sorteio:</h3>";

    Object.entries(sorteio).forEach(([amigo, sorteado]) => {
        let li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteado}`;
        resultado.appendChild(li);
    });
}
