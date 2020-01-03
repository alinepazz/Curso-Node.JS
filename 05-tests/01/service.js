const {
    get
} = require('axios') //aqui estou consumindo a API Star Wars


const URL = `https://swapi.co/api/people` // consumindo o serviço

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json` // aqui vou pesquisar pelo nome e quero o formato json

    const result =  await get(url)
    return result.data.results.map(mapearPessoas)// pra cada item do results me traz somente o que especifiquei em mapearPessoas
    
}
function mapearPessoas (item) { // mapear as informações que vir da Api
   // do resultado que vir quero somente o nome e o peso

   return {
       nome: item.name,
       peso: item.height
   }
}
module.exports = {
    obterPessoas
}
