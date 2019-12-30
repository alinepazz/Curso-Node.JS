// TRABALHANDO COM CALLBACK/ SIMULAÇÃO DE FUNCTION ASSÍNCRONA

// 1 Obter um usuario
// 2 Obter o numero de um usuario a partir do seu Id
// 3 Obter o endereço do usuario pelo Id

// Importamos o módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco) // usando o promisify, conseguimos converter para promise automaticamente

//OBTER USUARIO
function obterUsuario() {
    //quando der algum problema --> reject(ERROR)
    //quando der tudo certo --> resolve
    return new Promise(function resolvePromise(resolve, reject){

        setTimeout(function() { //setTimeout -> executa uma função
           //return reject(new Error('DEU RUIM DE VERDADE'))
           
            return resolve({ //depois de 1seg retorno pra quem pediu
               id: 1,
               nome: 'Aline',
               dataNascimento: new Date() //criar data
           })
        }, 1000) // aqui ela vai esperar para retornar o valor
    })
}



//OBTER TELEFONE
function obterTelefone(idUsuario) { // por padrão o callback é o ultimo paramentro
    return new Promise(function resolvePromise(resolve, reject){

        setTimeout(() => {
            return resolve({
                telefone: '998464201',
                ddd: 11
            })
        }, 2000); //após 2 seg irá retornar o telefone
    })
}



//OBTER ENDEREÇO
function obterEndereco(idUsuario, callback) {
setTimeout(() => {
    return callback(null,{
        rua: 'das flores',
        numero: 246
    })

}, 2000);
}
//RESOLUÇÃO DE PROMISES COM ASYNC/AWAIT
//1º passo adicionar a palavra async na função -> automaticamente ela retornará uma promise

main() //tenho que chamar antes da função
async function main() {
    try {
        console.time ('medida-promise')  //medir o tempo de execução
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([ // se endereço não depende de telefone e telefone não depende de endereço, posso colocar em PROMISE.ALL -> isso diminui o tempo de resposta do meu código
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id) // endereço não depende do telefone, ele depende do usuário

        ])

        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')  //medir o tempo de execução
   
    }catch(error) {
        console.error('DEU RUIM!', error)
    }
}





