module.exports = app => {
    const driver = app.database.connection;
    const db = {};

    db.select = async () => {
        const conn = await driver.connect();
        const [rows] = await conn.query('SELECT * FROM nota;');
        return rows;
    };

    db.selectById = async id => {
        const conn = await driver.connect();
        const row = await conn.query('SELECT * FROM nota WHERE id = ?;', [id]);
        return row[0][0];
    };

    db.insert = async nota => {
        const conn = await driver.connect();
        const sql = 'INSERT INTO nota(titulo,conteudo,situacao) VALUES (?,?,?);';
        const values = [nota.titulo, nota.conteudo, nota.situacao];
        return await conn.query(sql, values).insertId;
    };

    db.update = async (id, nota) => {
        const conn = await driver.connect();
        const sql = 'UPDATE nota SET titulo=?, conteudo=?, situacao=? WHERE id=?';
        const values = [nota.titulo, nota.conteudo, nota.situacao, id];
        const result = await conn.query(sql, values);
        return result[0];
    };

    db.delete = async id => {
        const conn = await driver.connect();
        const sql = 'DELETE FROM nota where id=?;';
        const result = await conn.query(sql, [id]);
        return result[0];
    }

    return db;
}