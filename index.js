// TRABALHANDO COM CALLBACK/ SIMULAÇÃO DE FUNCTION ASSÍNCRONA

// 1 Obter um usuario
// 2 Obter o numero de um usuario a partir do seu Id
// 3 Obter o endereço do usuario pelo Id



//OBTER USUARIO
function obterUsuario(callback) {
 setTimeout(function() { //setTimeout -> executa uma função
    return callback(null, { //depois de 1seg retorno pra quem pediu
        id: 1,
        nome: 'Aline',
        dataNascimento: new Date() //criar data
    })
 }, 1000) // aqui ela vai esperar para retornar o valor
}



//OBTER TELEFONE
function obterTelefone(idUsuario, callback) { // por padrão o callback é o ultimo paramentro
    setTimeout(() => {
        return callback(null, {
            telefone: '998464201',
            ddd: 11
        })
    }, 2000); //após 2 seg irá retornar o telefone
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


//Pegar o valor do usuario
function resolverUsuario(error, usuario) { //quando terminar de executar essa função, tem que retornar o valor de usuario
    console.log('usuario', usuario)
}
obterUsuario( function resolverUsuario(error, usuario){ //quando obterUsuario terminar de executar ele irá chamar a função resolverUsuario
//no JS valor null || "" || 0 === false (tudo que é diferente disso é true no JS)
    if (error) { //validar se tiver erro
    console.error('DEU RUIM em USUARIO', error)
    return;
}
//Pegar o telefone do usuario
obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if (error1) { //validar se tiver erro
        console.error('DEU RUIM em TELEFONE', error)
        return;
    }
  obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
      if (error2) {
          console.error('DEU RUIM em ENDEREÇO', error)
          return;
      }
      //printar variavel usamos a craze
      console.log(`
      Nome: ${usuario.nome},
      Endereço: ${endereco.rua},${endereco.numero}
      Telefone: (${telefone.ddd})${telefone.telefone}
      `)
  })
    
})


}) 






// console.log('telefone', usuario)