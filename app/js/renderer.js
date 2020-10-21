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
    }else{
        timer.iniciar(tempo)
        play = true
    }
    imgs = imgs.reverse();
    btnPlay.src = imgs[0];
})

//recebe os dados da main
ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    data.pegaDados(nomeCurso)
    .then(dados => {
        tempo.textContent = dados.tempo;
    })
    curso.textContent = nomeCurso;
})

btnAdc.addEventListener('click', () => {
   let novoCurso =  campoAdicionar.value
   curso.textContent = novoCurso
   tempo.textContent = "00:00:00"
   campoAdicionar.value = ''
   ipcRenderer.send('curso-adicionado', novoCurso)
})
