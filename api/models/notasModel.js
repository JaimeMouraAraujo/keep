module.exports = app => {
    const connect = app.database.connection;
    const db = {};

    db.select = async () => {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM nota;');
        return rows;
    };

    db.selectById = async id => {
        const conn = await connect();
        const row = await conn.query('SELECT * FROM nota WHERE id = ?;', [id]);

        return row[0][0] || {};
    };

    db.insert = async nota => {
        const conn = await connect();
        const sql = 'INSERT INTO nota(titulo,conteudo,situacao) VALUES (?,?,?);';
        const values = [nota.titulo, nota.conteudo, nota.situacao];
        const response = await conn.query(sql, values);
        return response[0].insertId;
    };

    db.update = async (id, nota) => {
        let values = [];
        let updateString = '';

        for (let key in nota) {
            values.push(nota[key]);
            updateString += key + ' = ?, ';
        }
        values.push(id);

        const conn = await connect();
        const sql = 'UPDATE nota SET ' + updateString.slice(0, -2) + ' WHERE id = ?;';
        const result = await conn.query(sql, values);
        return result[0];
    };

    db.delete = async id => {
        const conn = await connect();
        const sql = 'DELETE FROM nota WHERE id = ?;';
        const result = await conn.query(sql, [id]);
        return result[0];
    }

    return db;
}