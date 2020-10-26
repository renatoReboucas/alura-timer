const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre');
const btnPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo')
let curso = document.querySelector(".curso");
const btnAdc = document.querySelector(".botao-adicionar");
const campoAdicionar = document.querySelector(".campo-adicionar");

window.onload = () => {
  data
    .pegaDados(curso.textContent)
    .then((dados) => {
    //   console.log("dados", dados);
      tempo.textContent = dados.tempo
    })
    .catch((error) => {
      console.log("Deu ruim pegaDados js", error);
    });
};

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false
btnPlay.addEventListener('click', () => {
    if(play){
       timer.parar(curso.textContent)
       play = false
        new Notification("Alura Timer", {
          body: `O curso ${curso.textContent} parado!`,
          icon: '../img/stop-button.png'
        });
    }else{
        timer.iniciar(tempo)
        play = true
        new Notification("Alura Timer", {
          body: `O curso ${curso.textContent} iniciado!`,
          icon: "../img/play-button.png",
        });
    }
    imgs = imgs.reverse();
    btnPlay.src = imgs[0];
})

//recebe os dados da main
ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    timer.parar(curso.textContent)
    data.pegaDados(nomeCurso)
    .then(dados => {
        tempo.textContent = dados.tempo;
    }).catch(error => {
      console.log('O curso ainda não possui um JSON');
      tempo.textContent = '00:00:00'
    })
    curso.textContent = nomeCurso;
})

btnAdc.addEventListener('click', () => {
  if(campoAdicionar.value == ''){
    console.log('Não posso adicionar um curso com o nome vazio');
    return;
  }
   let novoCurso =  campoAdicionar.value
   curso.textContent = novoCurso
   tempo.textContent = "00:00:00"
   campoAdicionar.value = ''
   ipcRenderer.send('curso-adicionado', novoCurso)
})

//recebe dados da main atraves de um atalho
ipcRenderer.on("atalho-iniciar-parar", () => {
  // cria evento de click na tela 
  let click = new MouseEvent('click')
  btnPlay.dispatchEvent(click)
});