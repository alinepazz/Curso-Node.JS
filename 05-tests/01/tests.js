const assert = require('assert') // trabalhando com asserções dentro do js
//para trabalhar de forma automatizada com esse fremework-> estalamos de forma global-> npm install -g mocha
//para o projeto entender que estou trabalhando com mocha, precisamos instalar
//como dependência de desenvolvimento  -> --save-dev mocha
// instalamos o Nock para simular resultados fakes -> npm install nock
const {
    obterPessoas
} = require('./service')

// instalamos o pacote nock, para simular requisições
const nock = require('nock') // estou trazendo para a memoria



describe('Star Wars Tests', function () { //suíte de testes
    this.beforeAll(() => { // antes de cada uma das funções, quero que execute uma tarefa
        const response = // definir resposta
            {
                count: 1,
                next: null,
                previous: null,
                results: [
                  {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.co/api/planets/8/',
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.co/api/people/3/'
                  }
                ]
              }
            nock('https://swapi.co/api/people')  // toda vez que for passado essa url
            .get('/?search=r2-d2&format=json') // com esses paramentros
            .reply(200, response) // quero que responda com status 200 e o response que criamos


        } )
   

    it('deve buscar o r2d2 com o formato correto', async () => {// definir os sub testes
        const expected = [{ // estado esperado/ construir a assinatura
            nome: 'R2-D2', 
            peso: '96'
        }]
        const nomeBase = `r2-d2`
        const resultado = await obterPessoas(nomeBase)
        assert.deepEqual(resultado, expected)

    })
})