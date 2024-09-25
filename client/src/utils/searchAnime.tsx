export const searchAnime = async (animeName: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`);
    const data = await response.json();

    if(data.data && data.data.length > 0) {
        return data.data[0].images.jpg.large_image_url;
    } else {
        throw new Error('No anime found');
    }
};

export const fetchAnimeRecommendations = async (animeName: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=5`);
    const data = await response.json();

    if(data.data && data.data.length > 0) {
        return data.data.map((anime: any) => anime.title);
    } else {
        return [];
    }
};

// api.js (or your API file)
export const fetchGenre = async (animeName: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=5`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
        return data.data.map((anime: any) => anime.genres.map((genre: any) => genre.name));
    } else {
        return [];
    }
};

export const fetchAnimeDescription = async (animeName: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`);
    const data = await response.json();

    if(data.data && data.data.length > 0) {
        return data.data[0].synopsis;
    } else {
        throw new Error('No description found');
    }
}

export const fetchTotalEpisodes = async (animeName: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`);
    const data = await response.json();

    if(data.data && data.data.length > 0) {
        return data.data[0].episodes;
    } else {
        throw new Error('Not found');
    }
}