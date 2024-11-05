let tentativas = 0;
let pesoAleatorio;
let alturaAleatoria;

// Fecha o modal do IMC
function fecharImcModal() {
    document.getElementById("imc-modal").style.display = "none";
}

// Abre o modal de alerta para campos obrigatórios
function abrirAlertaCamposModal() {
    const alertaModal = document.getElementById("alerta-campos");
    alertaModal.style.display = "block";
}

// Fecha o modal de alerta para campos obrigatórios
function fecharAlertaCamposModal() {
    const alertaModal = document.getElementById("alerta-campos");
    alertaModal.style.display = "none";
}

// Valida se todos os campos do IMC foram preenchidos corretamente
function validarImc(event) {
    event.preventDefault(); // Impede o envio do formulário

    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    // Verifica se todos os campos estão preenchidos
    if (!peso || !altura) {
        abrirAlertaCamposModal(); // Abre o modal se os campos não estiverem preenchidos
        return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const imcCalculado = pesoNum / (alturaNum * alturaNum);

    // Exibe o resultado do IMC
    exibirResultadoImc(imcCalculado);

    tentativas++; // Incrementa o contador

    // Após 3 tentativas, exibe a informação sobre o cálculo do IMC
    if (tentativas >= 3) {
        abrirCriterioImcModal(); // Abre o modal de informação
        tentativas = 0; // Reseta o contador
    }
}

// Função para exibir o resultado do IMC em um modal
function exibirResultadoImc(imc) {
    let categoria;

    // Classificação do IMC
    if (imc < 18.5) {
        categoria = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        categoria = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        categoria = "Sobrepeso";
    } else {
        categoria = "Obesidade";
    }

    const resultadoModal = document.createElement('div');
    resultadoModal.className = 'modal';
    resultadoModal.innerHTML = `
        <div class="modal-content">
            <span onclick="fecharResultadoModal(this.parentElement.parentElement)" class="close">&times;</span>
            <h3>Resultado do IMC</h3>
            <p>Seu IMC é: ${imc.toFixed(2)}</p>
            <p>Classificação: ${categoria}</p>
            <button onclick="fecharResultadoModal(this.parentElement.parentElement)">Fechar</button>
        </div>
    `;
    document.body.appendChild(resultadoModal);
    resultadoModal.style.display = 'block';

    // Limpa os campos de peso e altura
    document.getElementById("peso").value = '';
    document.getElementById("altura").value = '';
}

// Fecha o modal de resultado do IMC
function fecharResultadoModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal); // Remove o modal do DOM
    document.body.style.overflow = 'auto'; // Garante que o scroll funcione
}

// Gera valores aleatórios de peso e altura
function gerarValoresAleatorios() {
    pesoAleatorio = (Math.random() * 100 + 30).toFixed(2); // Peso entre 30 e 130 kg
    alturaAleatoria = (Math.random() * 1.5 + 1.5).toFixed(2); // Altura entre 1.50 e 2.00 m
}

// Abre o modal com informações sobre como calcular o IMC
function abrirCriterioImcModal() {
    gerarValoresAleatorios(); // Gera novos valores aleatórios

    const criterioModal = document.createElement('div');
    criterioModal.className = 'modal';
    criterioModal.innerHTML = `
        <div class="modal-content">
            <span onclick="fecharCriterioModal(this.parentElement.parentElement)" class="close">&times;</span>
            <h3>Como Calcular o IMC</h3>
            <p>O IMC (Índice de Massa Corporal) é um cálculo utilizado para avaliar se uma pessoa está no peso adequado para sua altura.</p>
            <p>Para calcular o IMC, utilize a seguinte fórmula:</p>
            <div class="info">
                <h4>Fórmula do IMC:</h4>
                <p>IMC = Peso (kg) / (Altura (m) * Altura (m))</p>
            </div>
            <h4>Valores Gerados</h4>
            <p>Peso: <strong>${pesoAleatorio} kg</strong></p>
            <p>Altura: <strong>${alturaAleatoria} m</strong></p>
            <p><em>Agora tente você realizar o cálculo, utilizando esses valores!</em></p>
            <input type="number" id="resultadoImc" placeholder="Seu IMC" required>
            <div class="botao-centralizado">
                <button onclick="validarImcAleatorio(event)">Validar IMC</button>
                <button onclick="fecharCriterioModal(this.parentElement.parentElement)">Fechar</button>
            </div>
        </div>
    `;
    document.body.appendChild(criterioModal);
    criterioModal.style.display = 'block';
}

// Fecha o modal de critério
function fecharCriterioModal(modal) {
    modal.style.display = 'none'; // Esconde o modal
    document.body.removeChild(modal); // Remove o modal do DOM
    document.body.style.overflow = 'auto'; // Garante que o scroll funcione
}

// Função para validar o IMC informado pelo usuário
function validarImcAleatorio(event) {
    event.preventDefault(); // Impede o envio do formulário

    const resultadoInformado = document.getElementById("resultadoImc").value; // Campo para resultado do IMC

    const imcCalculado = pesoAleatorio / (alturaAleatoria * alturaAleatoria);

    if (!resultadoInformado) {
        abrirAlertaCamposModal(); // Abre o modal se o campo não estiver preenchido
        return;
    }

    // Compara os números diretamente
    if (parseFloat(resultadoInformado).toFixed(1) === imcCalculado.toFixed(1)) {
        alert("Parabéns! Você acertou o seu IMC!");
        fecharCriterioModal(document.querySelector('.modal'));
    } else {
        alert("Tente novamente! O IMC correto é " + imcCalculado.toFixed(2));
    }

    // Limpa o campo de resultado do IMC
    document.getElementById("resultadoImc").value = '';
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            if (modals[i].querySelector('.modal-content')) {
                fecharCriterioModal(modals[i]); // Fechar se clicar fora
            }
        }
    }
};
