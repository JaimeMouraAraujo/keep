module.exports = app => {
    const connect = app.database.connection;
    const db = {};

    db.select = async () => {
        const conn = await connect();
        const [rows] = await conn.query('SELECT * FROM usuario;');
        return rows;
    };

    db.selectById = async id => {
        const conn = await connect();
        const row = await conn.query('SELECT * FROM usuario WHERE id = ?;', [id]);
        console.log(row);
        return row[0][0] || {};
    };

    db.insert = async usuario => {
        const conn = await connect();
        const sql = 'INSERT INTO usuario(nome,usuario,senha) VALUES (?,?,?);';
        const values = [usuario.nome, usuario.usuario, usuario.senha];
        let response;

        try {
            response = await conn.query(sql, values);
        } catch (error) {
            if (error.code == "ER_DUP_ENTRY") {
                throw new Error("Usuário indisponível!");
            }
        }

        return response[0].insertId;
    };

    db.update = async (id, usuario) => {
        let values = [];
        let updateString = '';

        for (let key in usuario) {
            values.push(usuario[key]);
            updateString += key + ' = ?, ';
        }
        values.push(id);

        const conn = await connect();
        const sql = 'UPDATE usuario SET ' + updateString.slice(0, -2) + ' WHERE id = ?;';
        console.log(sql);
        const result = await conn.query(sql, values);
        return result[0];
    };

    db.delete = async id => {
        const conn = await connect();
        const sql = 'DELETE FROM usuario WHERE id = ?;';
        const result = await conn.query(sql, [id]);
        return result[0];
    }

    return db;
}