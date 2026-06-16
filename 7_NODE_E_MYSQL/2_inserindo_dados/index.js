const express = require('express');
const { engine } = require('express-handlebars');


const mysql = require('mysql');


const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})

// ==================== CADASTRAR ====================

app.get('/books/register', (req, res) => {
    res.render('register');
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty


    const query = `INSERT INTO books (tittle, pageqty) VALUES ('${title}', '${pageqty}')`
    connection.query(query, (err) => {
        if(err){
            console.error('Erro ao inserir livro: ', err);
            return;
        }
        res.redirect('/')
    });
});

// ==================== LISTAR ====================

app.get('/books/list', (req, res) => {

    connection.query('select * from books', (err, results) =>{
        if(err){
            console.error('Erro ao listar livros: ', err);
            return;
        }
        console.log('Resultados da consulta: ', results);
        res.render('list', { books: results });
    });


});

// ==================== EDITAR ====================

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    connection.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if(err){
            console.error('Erro ao buscar livro: ', err);
            return;
        }
        res.render('edit', { book: results[0] });
    });
});

app.post('/books/updatebook', (req, res) => {
 
    // const { id, title, pageqty } = req.body
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  connection.query('update books set tittle = ?, pageqty = ? where id = ?', [title, pageqty, id], (err) => {
    if(err){
        console.error('Erro ao atualizar livro: ', err);
        return;
    }
  })

  console.log(`Livro com id ${id} atualizado com sucesso!`);
  console.log(`Novo título: ${title}, nova quantidade de páginas: ${pageqty}`);
  console.log('Dados recebidos para atualização:', req.body);
    res.redirect('/books/list');
});

// ==================== DELETAR ====================

app.post('/books/delete', (req, res) => {
    const id = req.body.id;
    if(!id) {
        console.error('ID do livro não fornecido para exclusão.');
        return res.status(400).send('ID do livro é obrigatório para exclusão.');
    }
    connection.query('delete from books where id = ?', [id], (err) => {
        if(err){
            console.error('Erro ao deletar livro: ', err);
            return;
        }
        console.log(`Livro com id ${id} deletado com sucesso!`);
        res.redirect('/books/list');
    });
});

const connection = mysql.createConnection({
    host: 'localhost',
    port: 4040,
    user: 'matheus',
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
});

