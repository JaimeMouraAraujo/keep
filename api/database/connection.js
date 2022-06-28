const mysql = require("mysql2/promise");

module.exports = () => {
    return async () => {
        if (global.connection && global.connection.state !== 'disconnected')
            return global.connection;

        const connectionURL = "mysql://root:root@" + process.env.MYSQL_HOST + ":" + process.env.MYSQL_PORT + "/keep";

        console.log("MYSQL URL: " + connectionURL);
        const connection = await mysql.createConnection(connectionURL);
        console.log("Conectou no MySQL!");
        global.connection = connection;

        return connection
    };
}