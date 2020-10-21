const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre');
const btnPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo')
const curso = document.querySelector(".curso");

window.onload = () => {
  data
    .pegaDados(curso.textContent)
    .then((dados) => {
      console.log("dados", dados);
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