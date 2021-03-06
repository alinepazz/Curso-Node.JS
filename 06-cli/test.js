// definir o que preciso do assert
const {
    deepEqual,
    ok      //para validar true ou false
} = require('assert')

//criar uma variavel global

//importar minha database
const database = require('./database')
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Videncia',
    id: 1
     }
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Aline Paz',
    pode: 'Persistência',
    id: 2
}

//comi inicializar uma suíte de teste
describe('Suite de manipulação de Herois', () => {
    before(async() => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)//antes de tudo 
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)//antes de tudo 
    })

        it('deve pesquisar um heroi usando arquivos', async () => {
            const expected = DEFAULT_ITEM_CADASTRAR 
            const [resultado] = await database.listar(expected.id) // usando dessa forma [resultado] -> estou obtendo somente a primeira posição

            deepEqual(resultado, expected) // esse objeto tem que ser completamento igual ao objeto que passei
        })
    it('deve cadastrar um heroi, usando arquivos', async () => { // objetivo cadstrar um heroi
       const expected = DEFAULT_ITEM_CADASTRAR // falar o que é esperado
                           // preciso falar o que é o processamento

           const  resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)              
           const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

           deepEqual(actual, expected)   // em seguida validar a saída
    }) 
    it('deve remover um heroi por id', async () => { // it -> criando o teste
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)// quero que o resultado 

    })
    it('deve atualizar um heroi pelo id', async() => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    } )
})