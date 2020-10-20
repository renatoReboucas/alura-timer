const { ipcRenderer } = require('electron');
const timer = require('./timer')

let linkSobre = document.querySelector('#link-sobre');
const btnPlay = document.querySelector(".botao-play");
let tempo = document.querySelector('.tempo')


linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ["img/play-button.svg", "img/stop-button.svg"];
let play = false
btnPlay.addEventListener('click', () => {
    if(play){
       timer.parar()
       play = false
    }else{
        timer.iniciar(tempo)
        play = true
    }
    imgs = imgs.reverse();
    btnPlay.src = imgs[0];
})