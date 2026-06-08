const express = require('express')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/users', (req,res)=>{
    console.log('rota de usuarios')
    res.sendFile(`${basePath}/usuarios.html`)
})

router.get('/naoCliqueAqui', (req,res)=>{
    console.log('rota do botao dizendo pra nao clicar')
    res.sendFile(`${basePath}/naoCliqueAqui.html`)
})


module.exports = router