const service = require('./service')

//Substituir uma função global do JS

Array.prototype.meuMap = function (callback) {
   const novoArrayMapeado = [] // vai guardar as informações do array que termina a execução
   for(let indice =0; indice <= this.length - 1; indice++) { //this.length  -> é o tamanho da lista
    const resultado = callback(this[indice], indice)
    novoArrayMapeado.push(resultado);
   } 
   return novoArrayMapeado;
}

async function main() {
try {
    const results = await service.obterPessoas('a')
    //const names = []
    // results.results.forEach(function (item) { // pra cada item da lista, quero pegar o nome
    //    names.push(item.name) 

    // })
//    const names = results.results.map(function (pessoa) {
//         return pessoa.name
//     })

       // const names = results.results.map((pessoa) => pessoa.name)
       const names = results.results.meuMap(function (pessoa, indice) {
           return `[${indice}]${pessoa.name}`
       })
    console.log('names', names)
}
catch (error) {
    console.log('DEU RUIM', error)
}
}

main()