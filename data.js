const jsonfile = require('jsonfile-promised')
const fs = require('fs')
module.exports = {
  salvaDados(curso, tempoEstudado) {
    let path = __dirname + "/data/" + curso + ".json";
    if (fs.existsSync(path)) {
      this.adcionaTempoAoCurso(path, tempoEstudado);
    } else {
      this.criaArquivoDeCurso(path, {}).then(() => {
        this.adcionaTempoAoCurso(path, tempoEstudado);
      });
    }
  },
  criaArquivoDeCurso(path, conteudoArquivo) {
    return jsonfile
      .writeFile(path, conteudoArquivo)
      .then(() => {
        console.log("arquivo criado");
      })
      .catch((error) => {
        console.log("DEU RUIM writeFile!", error);
      });
  },
  adcionaTempoAoCurso(path, tempoEstudado) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudado,
    };
    jsonfile
      .writeFile(path, dados, { spaces: 2 })
      .then(() => {
        console.log("Tempo salvo com sucesso");
      })
      .catch((error) => {
        console.log("DEU RUIM adcionaTempoAoCurso", error);
      });
  },
  pegaDados(curso) {
    let path = __dirname + "/data/" + curso + ".json";
    return jsonfile.readFile(path);
  },
  pegaNomeDosCursos(){
    let arquivos =  fs.readdirSync(__dirname + '/data')
   let cursos =  arquivos.map((arquivo) => {
      return arquivo.substring(0, arquivo.lastIndexOf('.'))
    })
    return cursos
  }
};