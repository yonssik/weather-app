export const saveFavorites = (favorites) => {
    if (favorites.length !== 0) {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

export const getFavorites = () => {
    try {
        const favorites = localStorage.getItem("favorites");
        if (favorites === null) {
            return [];
        }
        return JSON.parse(favorites);
    } catch (error) {
        return [];
    }
};