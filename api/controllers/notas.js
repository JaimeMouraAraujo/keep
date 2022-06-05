// const uuidv4 = require('uuid/v4');

module.exports = app => {
    const notasDB = app.database.notas;
    const controller = {};

    controller.listNotas = async (req, res) => res.status(200).json(await notasDB.select());

    controller.listNotaById = async (req, res) => {
        const {
            notaId,
        } = req.params;

        res.status(200).json(await notasDB.selectById(notaId));
    };

    controller.saveNota = async (req, res) => {
        const notaId = await notasDB.insert({
            titulo: req.body.titulo || "(nota sem título)",
            conteudo: req.body.conteudo,
            situacao: req.body.situacao || 0
        });

        res.status(201).json({
            message: 'Nota inserida com sucesso!',
            sucess: true,
            insertId: notaId
        });
    };

    controller.removeNota = async (req, res) => {
        const {
            notaId,
        } = req.params;

        const retorno = await notasDB.delete(notaId);

        if (retorno.affectedRows === 0) {
            res.status(404).json({
                message: 'Nota não encontrada.',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Nota deletada com sucesso!',
                success: true
            });
        }
    };

    controller.updateNota = async (req, res) => {
        const {
            notaId,
        } = req.params;

        const nota = {
            titulo: req.body.titulo || "(nota sem título)",
            conteudo: req.body.conteudo,
            situacao: req.body.situacao || 0
        };

        const retorno = await notasDB.update(notaId, nota);

        if (retorno.affectedRows === 0) {
            res.status(404).json({
                message: 'Nota não encontrada.',
                success: false
            });
        } else {
            res.status(200).json({
                message: 'Nota atualizada!',
                success: true
            });
        }
    }

    return controller;
}