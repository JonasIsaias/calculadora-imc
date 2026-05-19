const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const resultado = document.getElementById("resultado");

// Eventos automáticos
pesoInput.addEventListener("input", calcularIMC);
alturaInput.addEventListener("input", formatarAltura);

function formatarAltura() {

    let valor = alturaInput.value;

    // Troca vírgula por ponto
    valor = valor.replace(",", ".");

    // Remove tudo que não for número ou ponto
    valor = valor.replace(/[^\d.]/g, "");

    // Evita mais de um ponto
    const partes = valor.split(".");
    if (partes.length > 2) {
        valor = partes[0] + "." + partes[1];
    }

    /*
        Se usuário digitar:
        175 => 1.75
        180 => 1.80
    */
    if (!valor.includes(".") && valor.length >= 3) {
        valor = valor.slice(0, 1) + "." + valor.slice(1, 3);
    }

    alturaInput.value = valor;

    calcularIMC();
}

function calcularIMC() {

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    // Sem obrigatoriedade
    if (!peso || !altura) {

        resultado.className = "resultado";

        resultado.innerHTML = `
            <h2>Resultado</h2>
            <p>Digite seu peso e altura.</p>
        `;

        return;
    }

    const imc = peso / (altura * altura);

    let categoria = "";
    let classe = "";

    if (imc < 18.5) {
        categoria = "Abaixo do peso";
        classe = "baixo";
    }

    else if (imc < 24.9) {
        categoria = "Peso normal";
        classe = "normal";
    }

    else if (imc < 29.9) {
        categoria = "Sobrepeso";
        classe = "sobrepeso";
    }

    else {
        categoria = "Obesidade";
        classe = "obesidade";
    }

    resultado.className = `resultado ${classe}`;

    resultado.innerHTML = `
        <h2>Resultado</h2>

        <p>
            Seu IMC é:
            <strong>${imc.toFixed(2)}</strong>
        </p>

        <p>
            Classificação:
            <strong>${categoria}</strong>
        </p>
    `;
}
