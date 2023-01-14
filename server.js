const express = require('express')
const pokemon = require('./pokemon')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/get_pokemon_data', (req, res) => {
    res.send(pokemon)
});
app.delete(`/delete_pokemon`, (req, res) => {
    console.log(req.body);
    res.send(pokemon)
});


// have the server listen to a port
app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})

