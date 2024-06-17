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


function user() {
    const userInputElement = document.getElementsByClassName('userInput');
    const userInput = userInputElement[0].value.trim();

    if (userInput === '') return;

    displayMessage(userInput, 'user');

    if (userInput.toLowerCase() === 'getjokes()') {
        getjokes();
    } else {
        displayMessage("Please write a valid command. Try 'getjokes()' for a random joke.", 'bot');
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
