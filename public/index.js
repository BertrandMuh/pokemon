
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
    pokemonNamePara.setAttribute('class', 'delete warning')
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
        getParseData = await res.json();
        if (Object.keys(getParseData).length == 0) {
            let message = 'The database is empty'
            messageForEmptyString(pokemonContainer, pokemonNamePara, message);
            // display result on the page
            displayOnThePage(htmlbody, pokemonContainer);
        }

        else if (getParseData.length > 0) {
            // Loop through the data received
            for (let i = 0; i < getParseData.length; i++) {
                let element = getParseData[i];
                // create elements to contain the data retrieved
                let pokemonNamePara = createElement('h3');
                pokemonNamePara.setAttribute('class', 'name')

                // Do this if user entered less than two values
                if (inputItem.length < 2) {
                    // Do this if input value is not empty
                    if (pokemonName.toLowerCase() === element.name.toLowerCase() || pokemonName.toLowerCase() === 'all') {
                        insertTextContent(pokemonNamePara, element.name)
                        pokemonContainer.append(pokemonNamePara);
                    }
                }

                // Do this if more than one value were provided
                else {
                    inputItem.forEach(item => {
                        if (element.name.toLowerCase() == item) {
                            insertTextContent(pokemonNamePara, element.name)
                            pokemonContainer.append(pokemonNamePara);
                        }
                    });
                }
                inputArrayCount++
                count++
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

    // make sure the input field is not empty
    if (pokemonName == '') {
        let message = 'Please, type the name of the pokemon you want to delete'
        let pokemonNamePara = createElement('h3');
        messageForEmptyString(pokemonContainer, pokemonNamePara, message)
    }
    else {
        // send the request as an object containing an array of value
        let inputItem = pokemonName.split(',').map(el => el.trim().toLowerCase())
        let request = {
            inputItem
        }

        // Send the request and wait for the response
        let res = await fetch(`/delete_pokemon`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        });
        let parseData = await res.json();

        // Do this if everything was deleted
        if (Object.keys(parseData).length == 0) {
            let message = 'All the data have been deleted'
            let pokemonNamePara = createElement('h3');
            messageForEmptyString(pokemonContainer, pokemonNamePara, message)
        }
        // Do this if some values were deleted
        else if (Object.keys(parseData).length > 0) {
            let { pokemon: remainingElements, removedElements: deletedElements } = parseData;
            let remainingElementsContainer = createElement('div');
            let deletedElementsContainer = createElement('div');

            remainingElementsContainer.setAttribute('id', 'remaining');
            deletedElementsContainer.setAttribute('id', 'deleted');

            let remainingHeader = createElement('h2');
            let deletedHeader = createElement('h2');

            remainingHeader.textContent = 'Current Database';
            // do this when at least one item is deleted
            if (Object.keys(parseData.removedElements).length == 1) {
                deletedHeader.textContent = 'The following name has been deleted:';
            }
            else if (Object.keys(parseData.removedElements).length > 1) {
                deletedHeader.textContent = 'The following names have been deleted:';
            }
            // Do this if the item was not found
            else if (Object.keys(parseData.removedElements) == 0) {
                deletedHeader.textContent = 'The item was not found in the database.';
                deletedHeader.setAttribute('class', 'warning')
            }

            remainingElementsContainer.appendChild(remainingHeader);
            deletedElementsContainer.appendChild(deletedHeader);

            remainingElements.forEach(el => {
                let para = createElement('h3');
                para.textContent = el.name
                remainingElementsContainer.appendChild(para);
            })
            deletedElements.forEach(el => {
                let para = createElement('h3');
                para.setAttribute('class', 'delete')
                para.textContent = el.name
                deletedElementsContainer.appendChild(para);
            })

            pokemonContainer.appendChild(deletedElementsContainer);
            pokemonContainer.appendChild(remainingElementsContainer)
        }
    }
    displayOnThePage(htmlbody, pokemonContainer);
}

const displayTheDetail = (e) => {
    const isHeader3 = e.target.nodeName === 'H3';
    if (isHeader3) {
        const pokemonName = e.target.textContent
        let detailContainer = getElementById('detail');
        let name = createElement('h2')
        let image = createElement('img');
        let age = createElement('h2')
        let infoDiv = createElement('div');
        getParseData.forEach(el => {
            if (el.name == pokemonName) {
                image.src = el.img + '.jpg';
                age.textContent = 'Age : ' + el.age
            }
        });
        name.textContent = 'Name : ' + pokemonName;
        infoDiv.appendChild(name);
        infoDiv.appendChild(age);
        if (detailContainer.hasChildNodes() === false) {
            detailContainer.appendChild(image);
            detailContainer.appendChild(infoDiv)
        }
        else {
            while (detailContainer.firstChild) {
                detailContainer.removeChild(detailContainer.firstChild)
            }
            detailContainer.appendChild(image);
            detailContainer.appendChild(infoDiv)
        }

    }

}
let getParseData;
let nameList = getElementById('name-list');
let htmlbody = getElementById('name-list');
let para = createElement('h3');
let requestButton = getElementById('request-button');
let deleteButton = getElementById('delete-button')
requestButton.addEventListener('click', getPokemon);
deleteButton.addEventListener('click', deletePokemon)
nameList.addEventListener('click', displayTheDetail)


