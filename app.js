// // Para seleção de um elemento de um arquivo do HTML
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo de número secreto';

// // A mesma ideia será feita com o parágrafo. Para alterar o conteúdo dessa propriedade 'p'
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10: ';

let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1;
let numeroLimite = 10;



function verificarChute() {
    let chute = document.querySelector('input').value
    if (chute == numeroSecreto) {
        exibirTextoTela('h1', "Acertou");
        exibirTextoTela('p', `Você descobriu o número secreto em ${tentativas} tentativa(s).`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if (chute > numeroSecreto) {
        exibirTextoTela('p', "O número informado é maior que o número secreto");

    }
    else {
        exibirTextoTela('p', "O número informado é menor que o número secreto");
    }
    tentativas++;
    limparCampo();
}



function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2}  );
}

exibirTelaInicial()

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1);
    let quantidadeNumerosLista = listaDeNumerosSorteados.length;

    // esvaziando a lista para caso a quantidade de números sorteados seja ultrapassada.
    if (quantidadeNumerosLista == 3) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }

    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}


// Função que limpa o campo todas as vezes que o número não é acertado.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// para habilitar o botão de um novo jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTelaInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}

function exibirTelaInicial() {
    exibirTextoTela('h1', 'Jogo do Número secreto');
    exibirTextoTela('p', 'Digite um número de 1 a 10: ');
}
