module.exports = app => {
    const controller = app.controllers.usuarios;

    app.route('/api/v1/usuarios')
        .get(controller.listUsuarios)
        .post(controller.saveUsuario);

    app.route('/api/v1/usuarios/:notaId')
        .get(controller.listUsuarioById)
        .delete(controller.removeUsuario)
        .put(controller.updateUsuario);
}