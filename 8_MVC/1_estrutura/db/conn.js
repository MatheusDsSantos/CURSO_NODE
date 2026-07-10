const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados realizada com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar com o banco de dados: ', error);
    }
}

testConnection();

module.exports = sequelize;