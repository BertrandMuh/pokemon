

const express = require('express')
let pokemon = require('./models/pokemon')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/get_pokemon_data', (req, res) => {
    res.send(pokemon)
});
app.delete(`/delete_pokemon`, (req, res) => {
    console.log(pokemon);
    console.log(req.body);
    let request = req.body.inputItem;
    let removedElements = []
    if (request.length == 1 && request[0].toLowerCase() === 'all') {
        pokemon = [];
        res.send(pokemon)
    }
    else if (request.length > 1) {
        request.forEach(el => {
            pokemon.forEach((Element, idx) => {
                if (el.toLowerCase() == Element.name.toLowerCase()) {
                    removedElements.push(pokemon.splice(idx, 1))
                }
            })
            console.log(el);

        });
        let response = {
            removedElements,
            pokemon
        }
        console.log(response)
        res.send(response)
    }

});


// have the server listen to a port
app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})

