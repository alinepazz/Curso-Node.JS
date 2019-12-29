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



//REFATORANDO CALLBACK PARA PROMISES
const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a função .then
// para manipular error usamos a função .catch
//retornei a função USUARIO depois chamei outra função --> TELEFONE depois passei pra frente --> chamando TELEFONE
usuarioPromise
    .then(function (usuario){ //telefone já é uma promise
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        } )

    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })

    })
    .then(function (resultado){ //passar um callback o resultado é o usuario propriamente dito
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
}) 
    .catch(function (error){
        console.error('DEU RUIM', error)
    })


//Pegar o valor do usuario
// function resolverUsuario(error, usuario) { //quando terminar de executar essa função, tem que retornar o valor de usuario
//     console.log('usuario', usuario)
// }
// obterUsuario( function resolverUsuario(error, usuario){ //quando obterUsuario terminar de executar ele irá chamar a função resolverUsuario
// //no JS valor null || "" || 0 === false (tudo que é diferente disso é true no JS)
//     if (error) { //validar se tiver erro
//     console.error('DEU RUIM em USUARIO', error)
//     return;
// }
// //Pegar o telefone do usuario
// obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//     if (error1) { //validar se tiver erro
//         console.error('DEU RUIM em TELEFONE', error)
//         return;
//     }
//   obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//       if (error2) {
//           console.error('DEU RUIM em ENDEREÇO', error)
//           return;
//       }
//       //printar variavel usamos a craze
//       console.log(`
//       Nome: ${usuario.nome},
//       Endereço: ${endereco.rua}, ${endereco.numero}
//       Telefone: (${telefone.ddd})${telefone.telefone}
//       `)
//   })
    
// })


// }) 

// console.log('telefone', usuario)


