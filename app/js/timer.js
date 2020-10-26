const {ipcRenderer} = require('electron')
const moment = require('moment')
let segundos = 0;
let timer;
let tempo
module.exports = {
  iniciar(el){
    tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds()
    //limpa os ids do setInterval
    clearInterval(timer)
    timer = setInterval(()=>{
     segundos++
     el.textContent = this.segundosParaTempo(segundos) 
    },1000)
  },segundosParaTempo(segundos){
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
  },parar(curso){
    let tempoEstudado = this.segundosParaTempo(segundos);
    clearInterval(timer)
    ipcRenderer.send("curso-parado", curso, tempoEstudado);
  }

}