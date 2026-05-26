import { input } from '@inquirer/prompts'

const p1 = await input({ message: 'qual a primeira nota?' })
const p2 = await input({ message: 'qual a segunda nota?' })

console.log({ p1, p2 })
