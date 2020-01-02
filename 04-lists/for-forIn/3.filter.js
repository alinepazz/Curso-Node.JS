//Objetivo do Filter -> filtrar informações do banco de dados

const {obterPessoas} = require ('./service')//importar somente uma função especifica/ usando {obterPessoas} dessa forma digo que só quero obterPessoas do service
/*
exemplo
const item = {
    nome: 'Aline',
    idade: 25,
}
mostar na tela  somente o nome
const = {nome} = item
console.log(nome)
*/

//CRIAR NOSSA IMPLEMENTAÇÃO DO FILTER
Array.prototype.meuFilter = function (callback) {
    const lista = []
    for(index in this){ // manipular e entrar em cada um da lista
        const item = this[index]
        const result = callback(item, index, this) //this -> lista completa. o resultado desse callback tem que ser true ou false
        // Se for 0, ou "", null, undefined === false
        if(!result) continue; // Se result não existir continue -> continuar o fluxo
        lista.push(item)

    }  
    return lista;
}
async function main() {
try {
    const {
        results                 // de dentro do obterPessoas quero somente results
    } = await obterPessoas('a') 

    // const familiaLars = results.filter(function (item) {
    //     // por padrão precisa retornar um booleano
    //     // para informar se deve manter ou remover da lista
    //     // false -> remove da lista (não estamos removendo de fato, estamos filtrando)
    //     // true -> mantém na lista
    //     // não encontrou é = -1
    //     // encontrou = posicaoNoArray

    //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1 //indexOf -> verifica se contém no meu texto. essa associação !== -> retorna true ou false
    //     return result
    // }) 
    const familiaLars = results.meuFilter((item, index, lista )=> {
        console.log(`idex: ${index}`, lista.length) //index é a posição atual do array
        return item.name.toLowerCase().indexOf(`lars`) !== -1// para ser da familiar lars tem que ser  !== -1 -> diferente de -1
    } )
        


    const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)
} catch (error) {
    console.error('DEU RUIM', error)
}
}

main()