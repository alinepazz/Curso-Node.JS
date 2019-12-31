// consumir informações do site star wars
// por isso usamos o npm install axios -> para consumir listar

const axios = require('axios') // importando o axios
const URL = `https://swapi.co/api/people` // clamando a url do site star wars -> consulmir API de pessoas

async function obterPessoas (nome) {  // quero manipular promises internamente dessa função por isso usamos ASYNC
    const url = `${URL}/?search=${nome}&format=json`
    const response =  await axios.get (url) // pegando informação que está vindo
    return response.data
}  

module.exports = {  // objetivo transformar esse arquivo em um modulo -> fazer com que os outros arquivos consigam visualizar
    obterPessoas
}

// obterPessoas('r2')
// .then(function (resultado) {
//     console.log('resultado', resultado)
// })
// .catch(function(error) {
//     console.error('DEU RUIM!', error)
// })
