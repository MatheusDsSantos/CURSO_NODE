// Importa o Express e o invoca para criar a instância da aplicação (app)
const express = require('express')
const app = express();
// Porta onde o servidor vai escutar; o ideal seria vir de process.env.PORT
const port = 3000;//variavel ambiente

// 'path' resolve caminhos de forma compatível entre sistemas (Windows usa '\', Linux usa '/')
const path = require('path')
// __dirname = pasta atual deste arquivo (.../3_render_html)
// path.join junta esse caminho com 'templates' -> .../3_render_html/templates
const basePath = path.join(__dirname,'templates')

// Rota GET na raiz ('/'): req = dados da requisição, res = resposta a enviar
app.get('/', (req,res)=>{
    // Concatena basePath + '/index.html' -> .../3_render_html/templates/index.html
    // res.sendFile precisa do caminho ABSOLUTO do arquivo, por isso usamos basePath (com __dirname)
    res.sendFile(`${basePath}/index.html`)
})

// Sobe o servidor na porta definida; o callback roda quando ele está pronto
app.listen(port, ()=>{
    console.log(`App rodando na porta: ${port}`)
})
