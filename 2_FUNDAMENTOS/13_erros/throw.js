const x = '10'

//checar se x é um numero

if(!Number.isInteger(x)){
    throw new Error("O valor de x nao é um numero inteiro")
}

console.log('continuando o codigo...')