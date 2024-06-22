let url = "https://v2.jokeapi.dev/joke/Any?safe-mode";

async function getjokes() {
    try {
        let res = await fetch(url);
        let joke = await res.json();
        
        if (joke.type === 'single') {
            display(joke.joke, 'bot');
        } else {
            display(joke.setup, 'bot');
            setTimeout(() => {
                display(joke.delivery, 'bot');
            }, 3000);
        }
    } catch (error) {
        display('Failed to fetch joke: ' + error.message, 'bot');
    }
}

let url2 = "https://catfact.ninja/fact"
async function catfact() {
    try {
        let res = await fetch(url2);
        let data = await res.json();

        console.log(data);
        
        display(data.fact, 'bot');
    } catch (error) {
        display('Failed to fetch cat fact: ' + error.message, 'bot');
    }
}

let url3 = "https://api.imgflip.com/get_memes"
async function meme() {
    try {
        let res = await fetch(url3);
        let data = await res.json();

        if (data.success) {
            let meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
            display(`Meme: ${meme.name}`, 'bot');
            display(meme.url, 'image');
        } else {
            display('Failed to fetch meme', 'bot');
        }
    } catch (error) {
        display('Failed to fetch meme: ' + error.message, 'bot');
    }
}

let url4 = "https://api.jikan.moe/v4/anime?q=";
async function anime(name) {
    try {
        let res = await fetch(url4 + encodeURIComponent(name));
        let data = await res.json();

        let animeData = data.data[0];
        let animeImage = animeData.images.jpg.image_url;
        let animeTitle = animeData.title_english || animeData.title;
        let animeSynopsis = animeData.synopsis;
        let animeRating = animeData.rating;
        let animeScore = animeData.score;
        let animeEpisodes = animeData.episodes;
        let animeStartDate = animeData.aired.from.split('T')[0];

        display(animeImage, 'image');
        display("Title: " + animeTitle, 'bot');
        display("Rating: " + animeRating, 'bot');
        display("Score: " + animeScore, 'bot');
        display("Episodes: " + animeEpisodes, 'bot');
        display("Start Date: " + animeStartDate, 'bot');
        display("Synopsis: " + animeSynopsis, 'bot');

    } catch (error) {
        display('Failed to fetch anime: ' + error.message, 'bot');
    }
}


function user(){
    let message = document.querySelector(".message");
    let msg = message.value.trim();

    if (msg === '') return;
    display(msg,'user');


    if (msg.toLowerCase() === 'getjoke') {
        getjokes();
    }
    else if(msg.toLowerCase() === 'catfact'){
        catfact();
    }
    else if(msg.toLowerCase() === 'meme'){
        meme();
    }

    else if(msg.toLowerCase().startsWith('anime ')){
        let animeName = msg.slice(6).trim();
        if (animeName) {
            anime(animeName);
        } else {
            display("Please provide an anime name.", 'bot');
        }
    }

    else {
        display("Please write a valid command.", 'bot');
    }
    message.value = "";
}
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        user();
    }
}

function display(msg, send) {
    let contain = document.querySelector(".screen");
    let newDiv = document.createElement("div");
    
    if (send == 'image') {
        const img = document.createElement('img');
        img.src = msg;
        img.alt = 'image';
        img.style.maxWidth = '30%';
        newDiv.appendChild(img);
    } else {
        newDiv.textContent = msg;
        newDiv.className = send;
    }
    
    contain.appendChild(newDiv);
    contain.scrollTop = contain.scrollHeight;
}