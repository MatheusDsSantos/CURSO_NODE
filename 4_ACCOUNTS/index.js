//modulos externos
// 'inquirer' cria os menus/perguntas interativas no terminal. O .default existe porque
// a versao nova da lib usa ES Modules, e precisamos pegar a exportacao padrao.
const inquirer = require('inquirer').default

// 'chalk' deixa o texto do terminal colorido (cor de fundo, cor da letra, etc.).
const chalk = require('chalk').default

//modulos internos

// 'fs' (file system) e um modulo nativo do Node para ler, escrever e checar arquivos/pastas.
const fs = require('fs')

// Mensagem simples avisando que o programa comecou.
console.log('iniciamos o accounts')

// Chama a funcao principal que mostra o menu logo que o programa roda.
operation()

// Funcao principal: exibe o menu de acoes para o usuario.
function operation(){

    // inquirer.prompt recebe uma lista de perguntas e retorna uma Promise com as respostas.
    inquirer.prompt([{
        type: 'select',          // tipo "select" = lista de opcoes para escolher
        name: 'action',          // nome do campo; sera a chave da resposta (answer.action)
        message: 'o que voce deseja fazer',  // texto mostrado ao usuario
        choices: [               // as opcoes disponiveis no menu
            'criar conta',
            'consultar saldo',
            'depositar',
            'sacar',
            'sair'
    ]
    }]).then((answer) =>{        // .then roda quando o usuario responde
        const action = answer['action']  // pega a opcao escolhida
        console.log(action)              // mostra no terminal (util para debug)

        // Decide qual funcao chamar de acordo com a escolha do usuario.
        if(action === 'criar conta'){
            createAccount();
        }else if(action === 'depositar'){
            deposit();
        }else if(action === 'consultar saldo'){

            //balance = saldo
            getAccountBalance();
        }else if(action === 'sacar'){
            // (ainda nao implementado)
        }else if(action === 'sair'){
            console.log(chalk.bgBlue.black('obrigado por usar o account'));
            process.exit()          // encerra o programa
        }
    })
       .catch((err) => console.log(err))  // se der erro na pergunta, mostra no terminal
}



// create an account
// Funcao que inicia a criacao de uma conta: mostra as boas-vindas e chama buildAccount.
function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('defina as opçoes da sua conta a seguir'))
    buildAccount();

}

// Funcao que de fato pergunta o nome e cria o arquivo da conta.
function buildAccount(){

    // Pergunta o nome da conta.
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ]).then(answer =>{

        const accountName = answer['accountName']  // pega o nome digitado
        console.info(accountName)                  // mostra no terminal (debug)

        // Se a pasta "accounts" ainda nao existe, cria ela.
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        // Se ja existe um arquivo com esse nome, avisa e pede o nome de novo.
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('esta conta ja existe, escolha outro nome!'))
            buildAccount();   // recomeca o processo
            return;           // 'return' impede que o codigo abaixo execute e sobrescreva a conta
        }

        // Cria o arquivo JSON da conta com saldo inicial 0.
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance" : 0}', function(err){console.log(err)})


        console.log(chalk.green('parabens, sua conta foi criada'))
    }).catch(err => console.log(err))  // trata erros do prompt
}

// Funcao responsavel por depositar dinheiro em uma conta.
function deposit(){
    // Pergunta em qual conta sera feito o deposito.
    inquirer.prompt([
        {
            name:'accountName',
            message: 'qual o nome da sua conta?'
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']  // nome da conta informado

        //verify account exist
        // Verifica se a conta existe; se nao existir, recomeca o deposito.
        if(!checkAccount(accountName)){
            return deposit();
        }


        // Pergunta o valor que sera depositado.
        inquirer.prompt([{
            name:'amount',
            message:'quanto voce deseja depositar'
        },
    ]).then((answer) =>{
        const amount = answer['amount']  // valor digitado (vem como texto/string)

        //add an amount
        addAmount(accountName, amount);  // soma o valor no saldo da conta
        operation();                     // volta ao menu principal


    }).catch(err => console.log(err))  // trata erros da pergunta do valor
    })
    .catch(err => console.log(err))    // trata erros da pergunta do nome
}

// Verifica se o arquivo da conta existe. Retorna true (existe) ou false (nao existe).
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('essa conta nao existe, tente novamente'))
        return false
    }

    return true
}

// Adiciona um valor ao saldo da conta e salva no arquivo.
function addAmount(accountName, amount){
    const accountData = getAccount(accountName);  // le os dados atuais da conta

    // Se o usuario nao informou nenhum valor, avisa e recomeca o deposito.
    if(!amount){
        console.log(chalk.bgRed.black('ocorreu um erro'))
        return deposit()
    }

    // Soma o valor depositado ao saldo atual.
    // parseFloat converte texto em numero, senao o '+' iria CONCATENAR (ex: "100"+"50" = "10050").
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    // Salva os dados atualizados de volta no arquivo.
    // JSON.stringify transforma o objeto JavaScript em texto JSON para poder gravar.
    fs.writeFileSync(
        `accounts/${accountName}.json`, JSON.stringify(accountData),(err)=> { console.log(err)}
    )

    console.log(chalk.green(`foi depositado o valor de R$ ${amount} na sua conta!`))
}

// Le o arquivo da conta e devolve os dados como objeto JavaScript.
function getAccount(accountName){

    // Le o conteudo do arquivo como texto (utf-8), modo leitura ('r').
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    });

    // JSON.parse converte o texto JSON de volta em objeto JavaScript.
    return JSON.parse(accountJson)
}


//show account balance
function getAccountBalance(){
    inquirer.prompt([{
        name:'accountName',
        message: 'qual o nome da sua conta?'
    }]).then((answer)=>{
        
        const accountName = answer["accountName"]

        //verificar se a conta existe
       if(!checkAccount(accountName)){
        return getAccountBalance()
       }

       //le os dados da conta
       const accountData = getAccount(accountName)

       console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$ ${accountData.balance}`))

    }).catch(err => console.log(err))
}