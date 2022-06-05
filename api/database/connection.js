const mysql = require("mysql2/promise");

module.exports = () => {
    const db = {};

    db.connect = async () => {
        if (global.connection && global.connection.state !== 'disconnected')
            return global.connection;

        const connection = await mysql.createConnection("mysql://root:1234@localhost:3306/keep");
        console.log("Conectou no MySQL!");
        global.connection = connection;

        return connection
    }

    return db;
}