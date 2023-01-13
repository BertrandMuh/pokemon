
const createElement = (element) => {
    return document.createElement(element)
}

const getElementById = (id) => {
    return document.getElementById(id)
}

let requestButton = getElementById('request-button');
let deleteButton = getElementById('delete-button')

const getPokemon = async () => {
    let res = await fetch('/get_pokemon_data');
    let parseData = await res.json();
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');
    let pokemonName = getElementById('pokemon-name').value

    for (let i = 0; i < parseData.length; i++) {
        // console.log(parseData.length)
        let element = parseData[i]
        let pokemonNamePara = createElement('h3');
        let anchorTag = createElement('a');
        anchorTag.setAttribute('href', element.img + '.jpg');
        anchorTag.setAttribute('target', '_blank')
        console.log(pokemonName)
        if (pokemonName.toLowerCase() == element.name.toLowerCase() || pokemonName.toLowerCase() == 'all') {
            anchorTag.textContent = element.name
            pokemonNamePara.appendChild(anchorTag)
            pokemonContainer.append(pokemonNamePara);
        }
        else if (pokemonName.toLowerCase() !== element.name.toLowerCase()) {
            pokemonNamePara.textContent = 'The pokemon could not be found. Try again later.'
            pokemonContainer.append(pokemonNamePara);
            break

        }

    };
    let body = getElementById('body');
    if (getElementById('pokemon-container') === null && pokemonName !== null) {
        body.appendChild(pokemonContainer)
    }
    else if (getElementById('pokemon-container') !== null && pokemonName !== null) {

        body.removeChild(getElementById('pokemon-container'));
        body.appendChild(pokemonContainer)
    }

}

const deletePokemon = async () => {
    //send a fecth request
    let pokemonName = getElementById('pokemon-name').value
    let res = await fetch(`/delete_pokemon`);
    // format the response so it can be read
    let parseData = await res.json();
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');


    for (let i = 0; i < parseData.length; i++) {
        // console.log(parseData.length)
        let element = parseData[i]
        let pokemonNamePara = createElement('h3');
        let anchorTag = createElement('a');
        anchorTag.setAttribute('href', element.img + '.jpg');
        anchorTag.setAttribute('target', '_blank')
        console.log(pokemonName);
        anchorTag.textContent = element.name
        pokemonNamePara.appendChild(anchorTag)
        pokemonContainer.append(pokemonNamePara);
        // if (pokemonName.toLowerCase() == element.name.toLowerCase() || pokemonName.toLowerCase() == 'all') {
        //     anchorTag.textContent = element.name
        //     pokemonNamePara.appendChild(anchorTag)
        //     pokemonContainer.append(pokemonNamePara);
        // }
        // else if (pokemonName.toLowerCase() !== element.name.toLowerCase()) {
        //     pokemonNamePara.textContent = 'The pokemon could not be found. Try again later.'
        //     pokemonContainer.append(pokemonNamePara);
        //     break

        // }

    };
    let body = getElementById('body');
    if (getElementById('pokemon-container') === null && pokemonName !== null) {
        body.appendChild(pokemonContainer)
    }
    else if (getElementById('pokemon-container') !== null && pokemonName !== null) {
        body.removeChild(getElementById('pokemon-container'));
        body.appendChild(pokemonContainer)
    }

}
requestButton.addEventListener('click', getPokemon);
deleteButton.addEventListener('click', deletePokemon)