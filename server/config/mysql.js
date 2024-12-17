const mysql = require('mysql2/promise');
require('dotenv').config();



console.log({
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLUSER: process.env.MYSQLUSER,
    MYSQLPASSWORD: process.env.MYSQLPASSWORD,
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLPORT: process.env.MYSQLPORT
});


const MySQLConnection = async () => {
    try {
        const connection = await mysql.createConnection({  // Asegúrate de usar await aquí
            database: process.env.MYSQLDATABASE,
            host: process.env.MYSQLHOST,
            password: process.env.MYSQLPASSWORD,
            user: process.env.MYSQLUSER,
            port: process.env.MYSQLPORT
        });
        console.log('Conexión a MySQL satisfactoriamente');
        return connection;
    } catch (err) {
        console.error('Error en la conexión a la base de datos:', err);
        throw new Error('Ha ocurrido un error en la conexión a la base de datos');
    }
};

module.exports = MySQLConnection;
