const moment = require('moment')
let segundos;
let timer;
module.exports = {
  iniciar(el){
    let tempo = moment.duration(el.textContent);
    segundos = tempo.asSeconds()
    //limpa os ids do setInterval
    clearInterval(timer)
    timer = setInterval(()=>{
     segundos++
     el.textContent = this.segundosParaTempo(segundos) 
    },1000)
  },segundosParaTempo(segundos){
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss')
  },parar(){
    clearInterval(timer)
  }

}