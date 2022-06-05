module.exports = app => {
    const driver = app.database.connection;
    const db = {};

    db.select = async () => {
        const conn = await driver.connect();
        const [rows] = conn.query('SELECT * FROM usuario;');
        return rows;
    };

    db.selectById = async id => {
        const conn = await driver.connect();
        const row = conn.query('SELECT * FROM usuario WHERE id = ?;', [id]);
        return row[0][0];
    };

    db.insert = async usuario => {
        const conn = await driver.connect();
        const sql = 'INSERT INTO usuario(nome,usuario,senha) VALUES (?,?,?);';
        const values = [nota.titulo, nota.conteudo, nota.situacao];
        return await conn.query(sql, values).insertId;
    };

    db.update = async (id, usuario) => {
        const conn = await driver.connect();
        const sql = 'UPDATE usuario SET nome=?, usuario=?, senha=? WHERE id=?';
        const values = [usuario.nome, usuario.usuario, usuario.senha, id];
        const result = await conn.query(sql, values);
        return result[0];
    };

    db.delete = async id => {
        const conn = await driver.connect();
        const sql = 'DELETE FROM usuario where id=?;';
        const result = await conn.query(sql, [id]);
        return result[0];
    }

    return db;
}