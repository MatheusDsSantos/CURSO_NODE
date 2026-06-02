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

        if(action === 'criar conta'){
            createAccount();
        }
    })
       .catch((err) => console.log(err))
}



// create an account
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('defina as opçoes da sua conta a seguir'))
}

