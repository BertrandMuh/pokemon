const express = require('express')
const pokemon = require('./pokemon')

const app = express()

const createElement = (element) => {
    return document.createElement(element)
}

const getElementById = (id) => {
    return document.getElementById(id)
}
// Have the server feed you html file in the public folder
app.use(express.static('public'))

app.get('/get_pokemon_data', (req, res) => {
    res.send(pokemon)
});

// have the server listen to a port
app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})

