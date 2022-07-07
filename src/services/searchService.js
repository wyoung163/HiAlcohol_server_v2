import { getSearchLists, getAllLists, getAllRecipes, getSearchRecipe } from "../models/Search.js";

class Item {
    id = ''
    cocktail = ''
    materials = []
}

const getLists = async (keyword) => {
    const allLists = await getAllLists();
    const searchLists = await getSearchLists(keyword);

    var recipeList = [];
    var index = 0;
    if (searchLists.length === 0) {
        var checked = [];
        for (var i = 0; i < allLists.length; i++)
            checked[i] = 0;
        for (var i = 0; i < allLists.length - 1; i++) {
            var item = new Item();
            if (checked[i] === 0) {
                item.id = allLists[i].id;
                item.cocktail = allLists[i].cocktail;
                item.materials[0] = allLists[i].material;
                recipeList[index] = item;
                checked[i] = 1;
            }

            for (var j = i + 1; j < allLists.length; j++) {
                if (checked[j] === 0 && allLists[i].id === allLists[j].id) {
                    checked[j] = 1;
                    recipeList[index].materials[recipeList[index].materials.length] = allLists[j].material;
                } else {
                    index++;
                    i = j - 1;
                    break;
                }
            }
        }
    } else if (searchLists.length === 1) {
        var item = new Item();
        item.id = searchLists[0].id;
        item.cocktail = searchLists[0].cocktail;
        item.materials[0] = searchLists[0].material;
        recipeList[0] = item;
    } else {
        var checked = [];
        for (var i = 0; i < searchLists.length; i++)
            checked[i] = 0;
        for (var i = 0; i < searchLists.length - 1; i++) {
            var item = new Item();
            if (checked[i] === 0) {
                item.id = searchLists[i].id;
                item.cocktail = searchLists[i].cocktail;
                item.materials[0] = searchLists[i].material;
                recipeList[index] = item;
                checked[i] = 1;
            }

            for (var j = i + 1; j < searchLists.length; j++) {
                if (checked[j] === 0 && searchLists[i].id === searchLists[j].id) {
                    checked[j] = 1;
                    recipeList[index].materials[recipeList[index].materials.length] = searchLists[j].material;
                } else {
                    index++;
                    i = j - 1;
                    break;
                }
            }
        }
    }
    return recipeList;
}

const getRecipe = async (recipeId) => {
    const allRecipes = await getAllRecipes();
    const recipe = await  getSearchRecipe(recipeId);

    var recipeList = [];
    var index = 0;

    if (recipe.length === 0) {
        var checked = [];
        for (var i = 0; i < allRecipes.length; i++)
            checked[i] = 0;
        for (var i = 0; i < allRecipes.length - 1; i++) {
            var item = new Item();
            if (checked[i] === 0) {
                item.id = allRecipes[i].id;
                item.cocktail = allRecipes[i].cocktail;
                item.materials[0] = allRecipes[i].material;
                recipeList[index] = item;
                checked[i] = 1;
            }

            for (var j = i + 1; j < allRecipes.length; j++) {
                if (checked[j] === 0 && allRecipes[i].id === allRecipes[j].id) {
                    checked[j] = 1;
                    recipeList[index].materials[recipeList[index].materials.length] = allRecipes[j].material;
                } else {
                    index++;
                    i = j - 1;
                    break;
                }
            }
        }
    } else if (recipe.length === 1) {
        var item = new Item();
        item.id = recipe[0].id;
        item.cocktail = recipe[0].cocktail;
        item.materials[0] = recipe[0].material;
        recipeList[0] = item;
    } else {
        var checked = [];
        for (var i = 0; i < recipe.length; i++)
            checked[i] = 0;
        for (var i = 0; i < recipe.length - 1; i++) {
            var item = new Item();
            if (checked[i] === 0) {
                item.id = recipe[i].id;
                item.cocktail = recipe[i].cocktail;
                item.materials[0] = recipe[i].material;
                recipeList[index] = item;
                checked[i] = 1;
            }

            for (var j = i + 1; j < recipe.length; j++) {
                if (checked[j] === 0 && recipe[i].id === recipe[j].id) {
                    checked[j] = 1;
                    recipeList[index].materials[recipeList[index].materials.length] = recipe[j].material;
                } else {
                    index++;
                    i = j - 1;
                    break;
                }
            }
        }
    }
    // console.log(recipe_list);
    var rate = recipe[0].rate;
    var content = recipe[0].content;
    item.rate = rate;
    item.content = content;

    return recipeList;
}

export { getLists, getRecipe };