//Eventos usamos para ações continuas, para manipular click, manipular arquivos entre outros

const EventEmitter = require('events') //class abstrata dentro do nodeJS
 class MeuEmissor extends EventEmitter {  // criar nossa propria class que extende todos os métodos da EventEmitter(capturar todos os métodos da  EventEmitter)

}

const meuEmissor = new MeuEmissor()//inicializar a propria class propriamente dita
const nomeEvento = 'usuario:click'    //criar o manipulador de eventos -> simular que o usuario está clicando
meuEmissor.on(nomeEvento, function (click) { //colocar um evento para ficar observando
    console.log('um usuario clicou', click) // observador, qualquer evento que acontecer ele vai printar no console
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')  //simular que um usuario está clicando
// meuEmissor.emit(nomeEvento, 'no ok')  //simular que um usuario está clicando

// let count = 0
// setInterval(function () {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count ++))  //simular que um usuario está clicando
// }, 1000)

const stdin = process.openStdin() // está abrindo
stdin.addListener('data', function (value) { // estou ouvindo um evento -> date que é da propria documentação do nodejs
   console.log(`Você digitou: ${value.toString().trim()}`)  // toda vez que o usuario digitar algo na tela, ele irá printar pra mim || .trim -> tira os espaços
} ) 