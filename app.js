let debounceTimer;
const debounceDelay = 300;

document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (query.trim()) {
            searchMemes(query);
        } else {
            clearMemes();
        }
    }, debounceDelay);
});

async function searchMemes(query) {
    const apiKey = 'F3bzJt4vxzkakcd914cflzKSmPaR8wfp';
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
    const memeHtml = memes.map(meme => `
        <div class="meme">
            <img src="${meme.images.fixed_height.url}" alt="${meme.title}">
        </div>
    `).join('');

    memeContainer.innerHTML = memeHtml;
}

function clearMemes() {
    const memeContainer = document.getElementById('meme-container');
    memeContainer.innerHTML = '';
}
