// ira ajudar a manipular minhas informações com meu banco
const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile) // assim consigo trabalhar com promises
const writeFileAsync = promisify(writeFile)
// outra forma de obter dados do json
//const dadosJson = require('./herois.json')

class Database { //criar dois metods auxiliares para ajudar no processo de obtenção de arquivos
    constructor(){  // criar o constructor com a definição do nome do nosso objeto
        this.NOME_ARQUIVO = 'herois.json'
    }
    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')  //quero obter todos os dados
        return JSON.parse(arquivo.toString())
    }
    async escreverArquivo(dados) { //receber informações e salvar informações no arquivo
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }
    //criar a função de cadastrar dados
    async cadastrar(heroi) {
        // primeiro obter o arquivo, modifica o arquivo e reescreve os dados
        const dados = await this.obterDadosArquivo()
        //depois que obtive os dados, eles são uma lista
        const id = heroi.id <= 2 ? heroi.id : Date.now() // Date.now()-> simula que estamos criando um id
        //objetivo é juntar os objetos para que no final tenha um só/ concatenar objetos
        const heroiComId =  {
            id, // pegar o id que criamos
            ...heroi // e juntar com todos os objetos que veio de heroi/ com os ... -> irá concatenar
        }
       const dadosFinal = [
           ...dados, // -> nesse caso vai pegar o array que ja tinha
           heroiComId // e concatenar com o objeto que já tenho
       ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }
    async listar(id) {
        const dados = await this.obterDadosArquivo() // filtrar as informações -> traz todo mundo
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))// porem quero somente o filtro
        return dadosFiltrados
    }

}

module.exports = new Database() // importar a instância