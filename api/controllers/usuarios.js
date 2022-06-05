// const uuidv4 = require('uuid/v4');

module.exports = app => {
    const usuariosDB = app.database.usuarios;
    const controller = {};

    controller.listUsuarios = async (req, res) => res.status(200).json(await usuariosDB.select());

    controller.listUsuarioById = async (req, res) => {
        const {
            usuarioId,
        } = req.params;

        res.status(200).json(await usuariosDB.selectById(usuarioId));
    };

    controller.saveUsuario = async (req, res) => {
        const usuarioId = await usuariosDB.insert({
            nome: req.body.nome || "Anônimo",
            usuario: req.body.usuario,
            senha: req.body.senha
        });

        res.status(201).json({
            message: 'Usuario inserido com sucesso!',
            sucess: true,
            insertId: usuarioId
        });
    };

    controller.removeUsuario = async (req, res) => {
        const {
            usuarioId,
        } = req.params;

        const retorno = await usuariosDB.delete(usuarioId);

        if (retorno.affectedRows === 0) {
            res.status(404).json({
                message: 'Usuário não encontrado.',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Usuário deletado com sucesso!',
                success: true
            });
        }
    };

    controller.updateUsuario = async (req, res) => {
        const {
            usuarioId,
        } = req.params;

        const usuario = {
            nome: req.body.nome || "Anônimo",
            usuario: req.body.usuario,
            senha: req.body.senha
        };

        const retorno = await usuariosDB.update(usuarioId, usuario);

        if (retorno.affectedRows === 0) {
            res.status(404).json({
                message: 'Usuário não encontrado.',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Usuário atualizado!',
                success: true
            });
        }
    }

    return controller;
}