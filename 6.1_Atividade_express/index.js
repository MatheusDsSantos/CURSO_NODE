const express = require('express')
const path = require('path')
const app = express();
const port = 5000
const basePath = path.join(__dirname,'templates')

const routesUser = require('./rotas_paginas')

app.use(express.json())
app.use(routesUser)


app.get('/', (req,res)=>{
    console.log('rota inicial')
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port)
