module.exports = app => {
    const controller = app.controllers.usuariosController;

    app.route('/api/v1/usuarios')
        .get(controller.listUsuarios)
        .post(controller.saveUsuario);

    app.route('/api/v1/usuarios/:usuarioId')
        .get(controller.listUsuarioById)
        .delete(controller.removeUsuario)
        .put(controller.updateUsuario);
}