module.exports = app => {
    const controller = app.controllers.notas;

    app.route('/api/v1/notas')
        .get(controller.listNotas)
        .post(controller.saveNota);

    app.route('/api/v1/notas/:notaId')
        .get(controller.listNotaById)
        .delete(controller.removeNota)
        .put(controller.updateNota);
}