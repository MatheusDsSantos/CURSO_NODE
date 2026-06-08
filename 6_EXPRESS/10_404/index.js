// Importa o Express e o invoca para criar a instância da aplicação (app)
const express = require('express')
const app = express();
const users = require('./users')

const port = 3000;

// 'path' resolve caminhos de forma compatível entre sistemas (Windows usa '\', Linux usa '/')
const path = require('path')

const basePath = path.join(__dirname,'templates')


app.use('/users', users)


app.get('/', (req,res)=>{
    // Concatena basePath + '/index.html' -> .../3_render_html/templates/index.html
    // res.sendFile precisa do caminho ABSOLUTO do arquivo, por isso usamos basePath (com __dirname)
    res.sendFile(`${basePath}/index.html`)
})

//redireciona o user pra pagina que existe
app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, ()=>{
    console.log(`App rodando na porta: ${port}`)
})
