
const createElement = (element) => {
    return document.createElement(element)
}

const getElementById = (id) => {
    return document.getElementById(id)
}

let requestButton = getElementById('request-button')

const getPokemon = async () => {
    let res = await fetch('/get_pokemon_data');
    let parseData = await res.json();
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');

    parseData.forEach(element => {
        let pokemonNamePara = createElement('h3');
        let anchorTag = createElement('a');
        anchorTag.setAttribute('href', element.img);
        anchorTag.setAttribute('target', '_blank')
        anchorTag.textContent = element.name
        pokemonNamePara.appendChild(anchorTag)

        pokemonContainer.append(pokemonNamePara);
    });
    let body = getElementById('body');
    if (getElementById('pokemon-container') === null) {
        body.appendChild(pokemonContainer)
    }

}

requestButton.addEventListener('click', getPokemon);