const { StatusCodes: HTTP } = require('http-status-codes');

module.exports = app => {
    const notasModel = app.models.notasModel;
    const controller = {};

    controller.listNotas = async (req, res) => {
        return res.status(HTTP.OK).json(await notasModel.select())
    };

    controller.listNotaById = async (req, res) => {
        const { notaId } = req.params;

        return res.status(HTTP.OK).json(await notasModel.selectById(notaId));
    };

    controller.saveNota = async (req, res) => {
        const notaId = await notasModel.insert({
            titulo: req.body.titulo || "(nota sem título)",
            conteudo: req.body.conteudo || "",
            situacao: req.body.situacao || 0
        });

        return res.status(HTTP.CREATED).json({
            message: 'Nota inserida com sucesso!',
            sucess: true,
            insertId: notaId
        });
    };

    controller.removeNota = async (req, res) => {
        const { notaId } = req.params;
        let retorno;

        if (isNaN(notaId)) {
            return res.status(HTTP.OK).json({
                message: 'Dados inválidos.',
                success: false,
                dados: { notaId }
            });
        } else {
            retorno = await notasModel.delete(notaId);
        }

        if (retorno.affectedRows === 0) {
            return res.status(HTTP.NOT_FOUND).json({
                message: 'Nota não encontrada.',
                success: false
            });
        } else {
            return res.status(HTTP.OK).json({
                message: 'Nota deletada com sucesso!',
                success: true
            });
        }
    };

    controller.updateNota = async (req, res) => {
        const helper = app.helpers.helper;

        let retorno;
        const { notaId } = req.params;
        const nota = {};

        if (req.body.titulo != undefined) {
            nota.titulo = req.body.titulo;
        }
        if (req.body.conteudo != undefined) {
            nota.conteudo = req.body.conteudo;
        }
        if (req.body.situacao != undefined) {
            nota.situacao = req.body.situacao;
        }

        if (isNaN(notaId) || helper.isEmpty(nota)) {
            return res.status(HTTP.OK).json({
                message: 'Dados inválidos.',
                success: false,
                dados: { notaId, nota }
            });
        } else {
            retorno = await notasModel.update(notaId, nota);
        }

        if (retorno.affectedRows === 0) {
            return res.status(HTTP.NOT_FOUND).json({
                message: 'Nota não encontrada.',
                success: false
            });
        } else {
            return res.status(HTTP.OK).json({
                message: 'Nota atualizada!',
                success: true
            });
        }
    }

    return controller;
}