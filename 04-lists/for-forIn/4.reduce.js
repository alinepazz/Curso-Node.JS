// Objetivo de Reduce é reduzir um array em um único objeto (resultado)

const {
    obterPessoas
} = require('./service')


//Implementar nosso proprio REDUCE
Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial: this[0]  // verifica se passou o valor inicial, se o valor for diferente de undefined , pego o valor, se não passar nada pego o valor na posição 0
    for(let index =0; index<=this.length -1; index ++ ) {
        valorFinal = callback(valorFinal, this[index], this) // vou substituir sempre o valorFinal pelo valor do incrementador
    }
    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas('a') // 'a' -> tudo que começa ou tenha a letra a
        // trazer todo o peso dessas pessoas
        // quero somar e verificar quanto que é peso de cada um
        const pesos = results.map(item => parseInt(item.height)) //parseInt -> garante que será um número/ usamos para quando fomos somar ele não concatenar strings
        console.log('pesos', pesos)
        // [20.2, 30.2, 40.5] temos um array com as informações, queremos reduzir a um objeto só, somando todos os objetos desse array
        // const total = pesos.reduce((anterior, proximo) => { // função com dois parametros
        //     return anterior + proximo
        // }) 


        //PEGAR O RESULTADO SOMENTE DE UM TEXTO
        const minhaLista = [ // OBJETIVO: concatenar os arrays e retornar uma lista só
            ['Aline', ' é Maravilhosa'],
            [' e fez curso no NodeBR', ' e na Reprograma']
        ]
        const total = minhaLista.meuReduce((anterior, proximo)=> {
          return anterior.concat(proximo) // concat-> método que usamos para concatenar listas
        },[])
        .join(',') // método join -> um separador, nesse caso por vírgula

        console.log('total', total)

    } catch (error) {
        console.log('DEU RUIM', error)
    }
}
main()