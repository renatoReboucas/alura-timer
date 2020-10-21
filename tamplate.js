const data = require('./data')
module.exports = {
  templateInicial: null,
  geraTrayTemplate(win) {
    let template = [{ label: "Cursos" }, { type: "separator" }];
    let cursos = data.pegaNomeDosCursos();
    cursos.forEach((curso) => {
      let menuItem = {
        label: curso,
        type: "radio",
        click: () => {
          win.send("curso-trocado", curso);
        },
      };
      template.push(menuItem);
    });
    this.tamplateInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso, win) {
    this.tamplateInicial.push({
      label: curso,
      type: "radio",
      checked: true,
      click: () => {
        win.send("curso-trocado", curso);
      },
    });
    return this.tamplateInicial;
  },
};