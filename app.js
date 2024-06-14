document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value;
    if (query.trim()) {
        searchMemes(query);
    } else {
        clearMemes();
    }
});

async function searchMemes(query) {
    const apiKey = 'mQbxashn9QwbwRFUATZE8YHPttjyma6O';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10&rating=g`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMemes(data.data);
    } catch (error) {
        console.error('Error fetching memes:', error);
    }
}

function displayMemes(memes) {
    const memeContainer = document.getElementById('meme-container');
    memeContainer.innerHTML = '';
    
    memes.forEach(meme => {
        const memeDiv = document.createElement('div');
        memeDiv.classList.add('meme');
        
        const img = document.createElement('img');
        img.src = meme.images.fixed_height.url;
        img.alt = meme.title;
        
        memeDiv.appendChild(img);
        memeContainer.appendChild(memeDiv);
    });
}

function clearMemes() {
    const memeContainer = document.getElementById('meme-container');
    memeContainer.innerHTML = '';
}
