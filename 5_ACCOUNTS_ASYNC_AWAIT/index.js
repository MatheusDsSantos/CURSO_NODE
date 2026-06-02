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
console.log('iniciamos o accounts (versao async/await)')

// Chama a funcao principal que mostra o menu logo que o programa roda.
operation()

// Funcao principal: exibe o menu de acoes para o usuario.
// 'async' marca a funcao para podermos usar 'await' dentro dela.
async function operation(){

    // Em vez de .then(), usamos 'await': o codigo PARA aqui ate o usuario responder,
    // e a resposta cai direto em 'answer'. Mais parecido com codigo "de cima pra baixo".
    // Envolvemos em try/catch porque sem o .catch() precisamos tratar erros assim.
    try {
        const answer = await inquirer.prompt([{
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
        }])

        const action = answer['action']  // pega a opcao escolhida
        console.log(action)              // mostra no terminal (util para debug)

        // Decide qual funcao chamar de acordo com a escolha do usuario.
        // Usamos 'await' para esperar cada acao terminar antes de seguir.
        if(action === 'criar conta'){
            await createAccount();
        }else if(action === 'depositar'){
            await deposit();
        }else if(action === 'consultar saldo'){
            //balance = saldo
            await getAccountBalance();
        }else if(action === 'sacar'){
            await withDraw();
        }else if(action === 'sair'){
            console.log(chalk.bgBlue.black('obrigado por usar o account'));
            process.exit()          // encerra o programa
        }
    } catch (err) {
        console.log(err)  // se der erro na pergunta, mostra no terminal
    }
}



// create an account
// Funcao que inicia a criacao de uma conta: mostra as boas-vindas e chama buildAccount.
async function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco'))
    console.log(chalk.green('defina as opçoes da sua conta a seguir'))
    await buildAccount();
}

// Funcao que de fato pergunta o nome e cria o arquivo da conta.
async function buildAccount(){
    try {
        // Pergunta o nome da conta (await espera a resposta).
        const answer = await inquirer.prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta:'
            }
        ])

        const accountName = answer['accountName']  // pega o nome digitado
        console.info(accountName)                  // mostra no terminal (debug)

        // Se a pasta "accounts" ainda nao existe, cria ela.
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        // Se ja existe um arquivo com esse nome, avisa e pede o nome de novo.
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('esta conta ja existe, escolha outro nome!'))
            // 'return await' espera a nova tentativa e impede o codigo abaixo de rodar.
            return await buildAccount();
        }

        // Cria o arquivo JSON da conta com saldo inicial 0.
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance" : 0}', function(err){console.log(err)})

        console.log(chalk.green('parabens, sua conta foi criada'))
    } catch (err) {
        console.log(err)  // trata erros do prompt
    }
}

// Funcao responsavel por depositar dinheiro em uma conta.
async function deposit(){
    try {
        // Pergunta em qual conta sera feito o deposito.
        const answer = await inquirer.prompt([
            {
                name:'accountName',
                message: 'qual o nome da sua conta?'
            }
        ])

        const accountName = answer['accountName']  // nome da conta informado

        //verify account exist
        // Verifica se a conta existe; se nao existir, recomeca o deposito.
        if(!checkAccount(accountName)){
            return await deposit();
        }

        // Pergunta o valor que sera depositado (await espera a resposta).
        const answer2 = await inquirer.prompt([{
            name:'amount',
            message:'quanto voce deseja depositar'
        }])

        const amount = answer2['amount']  // valor digitado (vem como texto/string)

        //add an amount
        addAmount(accountName, amount);  // soma o valor no saldo da conta
        operation();                     // volta ao menu principal
    } catch (err) {
        console.log(err)
    }
}

// Verifica se o arquivo da conta existe. Retorna true (existe) ou false (nao existe).
// Continua sincrona: nao usa prompt, so checa arquivo, entao nao precisa de async/await.
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
async function getAccountBalance(){
    try {
        const answer = await inquirer.prompt([{
            name:'accountName',
            message: 'qual o nome da sua conta?'
        }])

        const accountName = answer["accountName"]

        //verificar se a conta existe
        if(!checkAccount(accountName)){
            return await getAccountBalance()
        }

        //le os dados da conta
        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$ ${accountData.balance}`))

        operation();
    } catch (err) {
        console.log(err)
    }
}

//withdraw = sacar, funçao pra sacar valor da conta do usuario
async function withDraw(){
    try {
        const answer = await inquirer.prompt([{
            name: 'accountName',
            message:'qual nome da sua conta?'
        }])

        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return await withDraw();
        }

        const answer2 = await inquirer.prompt([{
            name: 'amount',
            message: 'quanto voce deseja sacar?'
        }])

        const amount = answer2['amount']

        //retira o valor do saldo da conta
        removeAmount(accountName, amount)
        operation()
    } catch (err) {
        console.log(err)
    }
}

// Retira um valor do saldo da conta e salva no arquivo.
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName);  // le os dados atuais da conta

    // Se o usuario nao informou nenhum valor, avisa e recomeca o saque.
    if(!amount){
        console.log(chalk.bgRed.black('ocorreu um erro, tente novamente mais tarde'))
        return withDraw()
    }

    // Se o valor pedido for maior que o saldo, nao deixa sacar.
    if(parseFloat(amount) > parseFloat(accountData.balance)){
        console.log(chalk.bgRed.black('valor indisponivel, saldo insuficiente!'))
        return withDraw()
    }

    // Subtrai o valor sacado do saldo atual (parseFloat para somar numeros, nao texto).
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    // Salva os dados atualizados de volta no arquivo.
    fs.writeFileSync(
        `accounts/${accountName}.json`, JSON.stringify(accountData),(err)=> { console.log(err)}
    )

    console.log(chalk.green(`foi realizado o saque de R$ ${amount} da sua conta!`))
}
