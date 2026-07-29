const express = require('express');
const exphs = require('express-handlebars');
const app = express();
const conn = require('./db/conn');

const Task = require('./models/Task')

const taskRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphs.engine());
app.set('view engine', 'handlebars');

// permitir que o express entenda os dados que vem do body da requisição, ou seja, ele vai permitir que o express entenda os dados que vem do formulário
app.use(express.urlencoded({ extended: true }));
//midleware para receber resposta do body em JSON
app.use(express.json());

//"Tudo que estiver dentro da pasta public pode ser acessado diretamente pelo navegador."
app.use(express.static('public'));

// as rotas vem depois dos middlewares, senão o req.body chega vazio
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.redirect('/tasks')
})


conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.log('Erro ao sincronizar o banco de dados: ', err);
  });