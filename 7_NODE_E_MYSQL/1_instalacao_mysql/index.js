const express = require('express');
const { engine } = require('express-handlebars');


const mysql = require('mysql');

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.render('home');
})


const connection = mysql.createConnection({
    host: 'localhost',
    user:   'matheus',
    password: '123456*',
    database: 'nodemysql'
})


connection.connect((err)=>{
    if(err){
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }

    console.log('conexão bem-sucedida ao banco de dados MySQL');
})


app.listen(4000, ()=>{
    console.log('Servidor rodando na porta 4000');
})

