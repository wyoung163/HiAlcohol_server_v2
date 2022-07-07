import { getCocktail } from "../models/Home.js";

class Item {
    id = ''
    cocktail = ''
}

const getRecommendedCocktail = async () => {
    const cocktail = await getCocktail();
    var recommendedCocktail = new Item();
    recommendedCocktail.id = cocktail[0].id;
    recommendedCocktail.cocktail = cocktail[0].cocktail;

    return recommendedCocktail;
}

export { getRecommendedCocktail };