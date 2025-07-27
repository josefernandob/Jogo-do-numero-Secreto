let listaDeNumeroS = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}
function exibirMsgInicial() {
  exibirTextoNaTela("h1", "Jogo do número da sorte");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMsgInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor!");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior!");
    }
    tentativas++;
    limpar();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElem = listaDeNumeroS.length;

  if (quantidadeDeElem == numeroLimite) {
    listaDeNumeroS = [];
  }

  if (listaDeNumeroS.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumeroS.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limpar() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limpar();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
