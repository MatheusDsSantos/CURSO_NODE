//modulos externos
const inquirer = require('inquirer').default

const chalk = require('chalk').default

//modulos internos

const fs = require('fs')

console.log('iniciamos o accounts')

operation()

function operation(){

    inquirer.prompt([{
        type: 'select',
        name: 'action',
        message: 'o que voce deseja fazer',
        choices: [
            'criar conta',
            'consultar saldo',
            'depositar',
            'sacar',
            'sair'
    ]
    }]).then((answer) =>{
        const action = answer['action']
        console.log(action)
    })
       .catch((err) => console.log(err))
}
