
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
'Please, type the name of the pokemon you want to delete'
const messageForEmptyString = (pokemonContainer, pokemonNamePara, message) => {
    insertTextContent(pokemonNamePara, message)
    pokemonNamePara.style.color = 'red'
    pokemonContainer.append(pokemonNamePara);
}

const displayOnThePage = (htmlbody, pokemonContainer) => {
    if (getElementById('pokemon-container') === null) {
        htmlbody.appendChild(pokemonContainer)
    }
    // make sure the result is not display more than one if the user keep on pressing the button
    else if (getElementById('pokemon-container') !== null) {
        htmlbody.removeChild(getElementById('pokemon-container'));
        htmlbody.appendChild(pokemonContainer)
    }
}
const getPokemon = async () => {
    let count = 0;
    let inputArrayCount = 0;

    //create elements to contain the data requested
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');
    let pokemonName = getElementById('pokemon-name').value;
    let pokemonNamePara = createElement('h3');
    // return a list of element if more than one value were entered
    let inputItem = pokemonName.split(',').map(el => el.trim().toLowerCase())

    if (pokemonName.toLowerCase() === '') {
        let message = 'Please, type the name of the pokemon(s) you are looking for.'
        messageForEmptyString(pokemonContainer, pokemonNamePara, message);
        // display result on the page
        displayOnThePage(htmlbody, pokemonContainer);
        count++
        inputArrayCount++
    }
    else {

        let res = await fetch('/get_pokemon_data');
        let parseData = await res.json();

        if (parseData.length == 0) {
            let message = 'The database is empty'
            messageForEmptyString(pokemonContainer, pokemonNamePara, message);
            console.log(parseData, parseData.length);
            // display result on the page
            displayOnThePage(htmlbody, pokemonContainer);
        }

        else if (parseData.length > 0) {
            console.log(parseData, parseData.length);
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
            displayOnThePage(htmlbody, pokemonContainer);
        }
    }

}

const deletePokemon = async () => {
    //send a fecth request
    let pokemonContainer = createElement('div');
    pokemonContainer.setAttribute('id', 'pokemon-container');
    let pokemonName = getElementById('pokemon-name').value;

    if (pokemonName == '') {
        let message = 'Please, type the name of the pokemon you want to delete'
        let pokemonNamePara = createElement('h3');
        messageForEmptyString(pokemonContainer, pokemonNamePara, message)
    }
    else {
        let inputItem = pokemonName.split(',').map(el => el.trim().toLowerCase())
        let request = {
            inputItem
        }
        let res = await fetch(`/delete_pokemon`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)

        });
        let parseData = await res.json();
        if (parseData.length == 0) {
            let message = 'All the data have been deleted'
            let pokemonNamePara = createElement('h3');
            messageForEmptyString(pokemonContainer, pokemonNamePara, message)
        }
        console.log(parseData, parseData.length);
    }
    displayOnThePage(htmlbody, pokemonContainer);


    // fetch('http://localhost:5000/create_fruit', {
    //     method: "DELETE",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(pokemonName)

    // })
}

let htmlbody = getElementById('body');
let para = createElement('h3');
let requestButton = getElementById('request-button');
let deleteButton = getElementById('delete-button')
requestButton.addEventListener('click', getPokemon);
deleteButton.addEventListener('click', deletePokemon)

