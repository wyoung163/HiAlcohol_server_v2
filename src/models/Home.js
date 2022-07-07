import { db } from "../../config/db.js";

async function getCocktail() {
    const getCocktailQuery = `
        select * from recipe order by rand() limit 1
    `;
    const [cocktail] = await db.query(getCocktailQuery);
    return cocktail;
}

export {
    getCocktail
};