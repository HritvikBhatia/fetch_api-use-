let url = "https://v2.jokeapi.dev/joke/Any?safe-mode";

async function getjokes() {
    try {
        let res = await fetch(url);
        let joke = await res.json();
        
        if (joke.type === 'single') {
            displayMessage(joke.joke, 'bot');
        } else {
            displayMessage(joke.setup, 'bot');
            setTimeout(() => {
                displayMessage(joke.delivery, 'bot');
            }, 3000);
        }
    } catch (error) {
        displayMessage('Failed to fetch joke: ' + error.message, 'bot');
    }
}

let url2 = "https://catfact.ninja/fact"
async function catfact() {
    try {
        let res = await fetch(url2);
        let data = await res.json();

        console.log(data);
        
        displayMessage(data.fact, 'bot');
    } catch (error) {
        displayMessage('Failed to fetch cat fact: ' + error.message, 'bot');
    }
}

function user() {
    const userInputElement = document.getElementsByClassName('userInput');
    const userInput = userInputElement[0].value.trim();

    if (userInput === '') return;

    displayMessage(userInput, 'user');

    if (userInput.toLowerCase() === 'getjoke') {
        getjokes();
    }
    else if(userInput.toLowerCase() === 'catfact'){
        catfact();
    }
    else {
        displayMessage("Please write a valid command.", 'bot');
    }

    // Clear the input field
    userInputElement[0].value = '';
}


function displayMessage(message, sender) {

    const messageContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    messageContainer.scrollTop = messageContainer.scrollHeight;
}


