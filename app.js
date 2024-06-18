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

let url3 = "https://api.imgflip.com/get_memes"
async function meme() {
    try {
        let res = await fetch(url3);
        let data = await res.json();

        if (data.success) {
            let meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
            displayMessage(`Meme: ${meme.name}`, 'bot');
            displayMessage(meme.url, 'image');
        } else {
            displayMessage('Failed to fetch meme', 'bot');
        }
    } catch (error) {
        displayMessage('Failed to fetch meme: ' + error.message, 'bot');
    }
}
let url4 = "https://api.jikan.moe/v4/anime?q="
async function anime(name) {
    try {
        let res = await fetch(url4 + encodeURIComponent(name));
        let data = await res.json();

        let animeImage = data.data[0].images.jpg.image_url;
        let animeRate = data.data[0].rating;
        let animeScore = data.data[0].score;
        let animetitle = data.data[0].title_english;
        
        displayMessage(animeImage, 'image');
    
        displayMessage("Name: "+animetitle, 'bot');
        displayMessage("Rating: "+animeRate, 'bot');
        displayMessage("Score: "+animeScore, 'bot');

    } catch (error) {
        displayMessage('Failed to fetch anime: ' + error.message, 'bot');
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
    else if(userInput.toLowerCase() === 'meme'){
        meme();
    }

    else if(userInput.toLowerCase().startsWith('anime ')){
        let animeName = userInput.slice(6).trim();
        if (animeName) {
            anime(animeName);
        } else {
            displayMessage("Please provide an anime name.", 'bot');
        }
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

    if (sender === 'image') {
        const img = document.createElement('img');
        img.src = message;
        img.alt = 'meme';
        img.style.maxWidth = '100%';
        messageDiv.appendChild(img);
    } else {
        messageDiv.textContent = message;
    }

    messageContainer.appendChild(messageDiv);

    messageContainer.scrollTop = messageContainer.scrollHeight;
}


