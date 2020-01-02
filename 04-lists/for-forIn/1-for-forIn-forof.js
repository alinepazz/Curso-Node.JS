const service = require('./service')

async function main() {
try {
    const result = await service.obterPessoas('a')
    const names = []

    //TRABALHANDO COM FOR
        console.time('for')
    for(let i=0; i<= result.results.length -1; i++) {
        const pessoa = result.results[i]
        
        names.push(pessoa.name)
    }
        console.timeEnd('for')

    //TRABALHANDO COM FORIN
             console.time('forin') 
        for(let i in result.banana) {  // o melhor tempo de resposta foi o FORIN
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('forin')
    //TRABALHANDO COM FOROF
        console.time('forof')
       for(pessoa of result.results) {
           names.push(pessoa.name)
       }
       console.timeEnd('forof')
    console.log(`names`, names)
}
catch(error) {
    console.error(`error interno`, error)
}
}

main()