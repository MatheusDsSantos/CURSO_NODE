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

    // TODO: faça o INSERT no banco aqui usando connection.query()
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
    // TODO: faça o SELECT no banco aqui e passe os resultados para a view
    // Exemplo:
    // connection.query('SELECT * FROM books', (err, results) => {
    //     res.render('list', { books: results })
    // })
    res.render('list');
});

// ==================== EDITAR ====================

app.get('/books/edit', (req, res) => {
    // TODO: busque o livro pelo id (req.query.id ou req.params.id) e passe para a view
    // Exemplo:
    // const id = req.params.id
    // connection.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
    //     res.render('edit', { book: results[0] })
    // })
    res.render('edit');
});

app.post('/books/updatebook', (req, res) => {
    // TODO: faça o UPDATE no banco aqui usando os dados do req.body
    // Exemplo:
    // const { id, title, pageqty } = req.body
    // connection.query('UPDATE books SET tittle = ?, pageqty = ? WHERE id = ?', [title, pageqty, id], ...)
    res.redirect('/books/list');
});

// ==================== DELETAR ====================

app.post('/books/delete', (req, res) => {
    // TODO: faça o DELETE no banco aqui usando o id do req.body
    // Exemplo:
    // const id = req.body.id
    // connection.query('DELETE FROM books WHERE id = ?', [id], ...)
    res.redirect('/books/list');
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

