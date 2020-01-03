// ira ajudar a manipular minhas informações com meu banco
const {
    readFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile) // assim consigo trabalhar com promises

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
    escreverArquivo() {

    }
    async listar(id) {
        const dados = await this.obterDadosArquivo() // filtrar as informações -> traz todo mundo
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))// porem quero somente o filtro
        return dadosFiltrados
    }

}

module.exports = new Database() // importar a instância