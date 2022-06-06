const { StatusCodes: HTTP } = require('http-status-codes');

module.exports = app => {
    const usuariosModel = app.models.usuariosModel;
    const controller = {};

    controller.listUsuarios = async (req, res) => {
        return res.status(HTTP.OK).json(await usuariosModel.select())
    };

    controller.listUsuarioById = async (req, res) => {
        const { usuarioId } = req.params;

        return res.status(HTTP.OK).json(await usuariosModel.selectById(usuarioId));
    };

    controller.saveUsuario = async (req, res) => {
        let usuarioId;
        const usuario = {
            nome: req.body.nome || "Anônimo",
            usuario: req.body.usuario || "",
            senha: req.body.senha || ""
        };

        if (usuario.usuario.trim().length == 0) {
            return res.status(HTTP.OK).json({
                message: 'Usuario não informado!',
                sucess: false
            });
        }

        if (usuario.senha.trim().length == 0) {
            return res.status(HTTP.OK).json({
                message: 'Senha não informada!',
                sucess: false
            });
        }

        try {
            usuarioId = await usuariosModel.insert(usuario);
        } catch (error) {
            return res.status(HTTP.OK).json({
                message: 'Usuario indisponível!',
                sucess: false
            });
        }

        return res.status(HTTP.CREATED).json({
            message: 'Usuario criado com sucesso!',
            sucess: true,
            insertId: usuarioId
        });
    };

    controller.removeUsuario = async (req, res) => {
        const { usuarioId } = req.params;
        let retorno;

        if (isNaN(usuarioId)) {
            return res.status(HTTP.OK).json({
                message: 'Dados inválidos.',
                success: false,
                dados: { usuarioId }
            });
        } else {
            retorno = await usuariosModel.delete(usuarioId);
        }

        if (retorno.affectedRows === 0) {
            return res.status(HTTP.NOT_FOUND).json({
                message: 'Usuário não encontrado.',
                success: false
            });
        } else {
            return res.status(HTTP.OK).json({
                message: 'Usuário deletado com sucesso!',
                success: true
            });
        }
    };

    controller.updateUsuario = async (req, res) => {
        const helper = app.helpers.helper;

        let retorno;
        const { usuarioId } = req.params;
        const usuario = {};

        if (req.body.nome != undefined) {
            usuario.nome = req.body.nome;
        }
        if (req.body.usuario != undefined) {
            usuario.usuario = req.body.usuario;
        }
        if (req.body.senha != undefined) {
            usuario.senha = req.body.senha;
        }

        if (usuario.hasOwnProperty('usuario') && usuario.usuario.trim().length == 0) {
            return res.status(HTTP.OK).json({
                message: 'Usuario não informado!',
                sucess: false
            });
        }

        if (usuario.hasOwnProperty('senha') && usuario.senha.trim().length == 0) {
            return res.status(HTTP.OK).json({
                message: 'Senha não informada!',
                sucess: false
            });
        }

        if (isNaN(usuarioId) || helper.isEmpty(usuario)) {
            return res.status(HTTP.OK).json({
                message: 'Dados inválidos.',
                success: false,
                dados: { usuarioId, usuario }
            });
        } else {
            retorno = await usuariosModel.update(usuarioId, usuario);
        }

        if (retorno.affectedRows === 0) {
            return res.status(HTTP.NOT_FOUND).json({
                message: 'Usuário não encontrado.',
                success: false
            });
        } else {
            return res.status(HTTP.OK).json({
                message: 'Usuário atualizado!',
                success: true
            });
        }
    }

    return controller;
}