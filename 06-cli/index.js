// npm install commander--> trazendo linhas de comando para o meu projeto
const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')


async function main() {
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi") //parametros para o cadastro
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")
    //adicionar opções para o nosso crud
    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .option('-l, --listar [value]', "listar um Heroi")
    .option('-r, --remover', "remover um Heroi pelo id")
    .option('-a, --atualizar [value]', "atualizar um Heroi pelo id")
    .parse(process.argv)

    const heroi = new Heroi(Commander)
    
    try {
        if(Commander.cadastrar) { //criando cadastrar
           delete heroi.id//remover uma chave de um objeto
            //console.log(heroi)
            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastrado!')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }
        if(Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(Commander.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
               console.error('Não foi possível remover um Heroi')
               return;
            }
            console.log('Heroi removido com sucesso!')
        }
        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar) //id que for passado
            //remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi) // vai transformar esse objeto em string
            const heroiAtualizar = JSON.parse(dado)//o que for chave desnecessaria, vai ser tirada
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado) {
                console.error('Não foi possível atualizar o Heroi!')
                return;
            }
            console.log('Heroi atualizado com Sucesso!')


        }

    }
    catch (error){
        console.log('DEU RUIM', error)
    }
}
main()