// Importa o Express e o invoca para criar a instância da aplicação (app)
const express = require('express')
const app = express();
// Porta onde o servidor vai escutar; o ideal seria vir de process.env.PORT
const port = 3000;//variavel ambiente

// 'path' resolve caminhos de forma compatível entre sistemas (Windows usa '\', Linux usa '/')
const path = require('path')

const basePath = path.join(__dirname,'templates')

const checkAut = function(req,res,next){

    //req.authStatus = true;
    req.authStatus = false;
    if(req.authStatus){
        console.log('está logado, pode continuar')
        next();
    }else {
        console.log('nao esta logado, faça o login para continuar')
        next()
    }
}

app.use(checkAut)


app.get('/', (req,res)=>{
    // Concatena basePath + '/index.html' -> .../3_render_html/templates/index.html
    // res.sendFile precisa do caminho ABSOLUTO do arquivo, por isso usamos basePath (com __dirname)
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port, ()=>{
    console.log(`App rodando na porta: ${port}`)
})
