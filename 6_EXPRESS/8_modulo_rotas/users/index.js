const express = require('express')
const router = express.Router()
const path = require('path')
const basePath = path.join(__dirname,'../templates')



router.get('/:id', (req,res)=>{
    const id = req.params.id
    //leitura da tabela users, resgatar um usuario do banco
    console.log(`estamos buscando pelo usuário: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})

module.exports = router
