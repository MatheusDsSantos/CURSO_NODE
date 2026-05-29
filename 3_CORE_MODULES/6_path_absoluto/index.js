const path = require('path')

//path absoluto
console.log(path.resolve('text.txt'))

//fomar path
const midFolder = 'relatorios'
const filename = 'matheus.txt'

const finalPath = path.join('/', 'arquivo', midFolder, filename)

console.log(finalPath)