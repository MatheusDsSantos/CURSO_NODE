const chalk = require('chalk')

const nota = 4


if(nota >= 7){
    console.log(chalk.green('parabens voce esta aprovado!'))
}else{
    console.log(chalk.bgRed.black('precisa fazer a prova de recuperação!'))
}