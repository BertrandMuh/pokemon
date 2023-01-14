
const createElement = (element) => {
    return document.createElement(element)
}
const getElementById = (id) => {
    return document.getElementById(id)
}
const insertTextContent = (element, textContent) => element.textContent = textContent;
// call this function when the item is not in the database
const itemNotFound = (element) => {
    element.textContent = 'Sorry, the pokemon could not be found. Try again later!'
}

const getPokemon = async () => {
    let count = 0;
    let inputArrayCount = 0;

    let res = await fetch('/get_pokemon_data');
    let parseData = await res.json();

    //create elements to contain the data requested
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');
    let pokemonName = getElementById('pokemon-name').value;

    // return a list of element if more than one value were entered
    let inputItem = pokemonName.split(',').map(el => el.trim().toLowerCase())

    // Loop through the data received
    for (let i = 0; i < parseData.length; i++) {
        let element = parseData[i];
        // create elements to contain the data retrieved
        let pokemonNamePara = createElement('h3');
        let anchorTag = createElement('a');
        anchorTag.setAttribute('href', element.img + '.jpg');
        anchorTag.setAttribute('target', '_blank')

        // Do this if user entered less than two values
        if (inputItem.length < 2) {
            // Do this if input value is not empty
            if (pokemonName.toLowerCase() === element.name.toLowerCase() || pokemonName.toLowerCase() === 'all') {
                insertTextContent(anchorTag, element.name)
                pokemonNamePara.appendChild(anchorTag)
                pokemonContainer.append(pokemonNamePara);
                count++
                inputArrayCount++
            }
            // Do this if input value is empty
            else if (pokemonName.toLowerCase() === '') {
                insertTextContent(pokemonNamePara, 'Please, type the name of the pokemon or type all to display all the pokemon name')
                pokemonNamePara.style.color = 'red'
                pokemonContainer.append(pokemonNamePara);
                count++
                inputArrayCount++
                break
            }
        }

        // Do this if more than one value were provided
        else {
            inputItem.forEach(item => {
                if (element.name.toLowerCase() == item) {
                    insertTextContent(anchorTag, element.name)
                    pokemonNamePara.appendChild(anchorTag)
                    pokemonContainer.append(pokemonNamePara);
                    inputArrayCount++
                    count++
                    console.log(inputArrayCount)
                }
            });
        }
    };

    //Do this if nothing was found it the database
    if (count == 0 || inputArrayCount == 0) {
        itemNotFound(para);
        pokemonContainer.appendChild(para)
    }
    // display result on the page
    if (getElementById('pokemon-container') === null) {
        body.appendChild(pokemonContainer)
    }
    // make sure the result is not display more than one if the user keep on pressing the button
    else if (getElementById('pokemon-container') !== null) {
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
        let element = parseData[i]
        let pokemonNamePara = createElement('h3');
        let anchorTag = createElement('a');
        anchorTag.setAttribute('href', element.img + '.jpg');
        anchorTag.setAttribute('target', '_blank')
        anchorTag.textContent = element.name
        pokemonNamePara.appendChild(anchorTag)
        pokemonContainer.append(pokemonNamePara);

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

let body = getElementById('body');
let para = createElement('h3');
let requestButton = getElementById('request-button');
let deleteButton = getElementById('delete-button')
requestButton.addEventListener('click', getPokemon);
deleteButton.addEventListener('click', deletePokemon)