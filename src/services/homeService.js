import { getCocktail } from "../models/Home.js";

class Item {
    id = ''
    cocktail = ''
    image = ''
}

const getRecommendedCocktail = async () => {
    const cocktail = await getCocktail();
    var recommendedCocktail = new Item();
    recommendedCocktail.id = cocktail[0].id;
    recommendedCocktail.cocktail = cocktail[0].cocktail;
    recommendedCocktail.image = cocktail[0].image;

    return recommendedCocktail;
}

export { getRecommendedCocktail };