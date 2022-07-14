import { insertRecipeInfo, updateRecipeInfo, insertMaterialInfo, selectMaterialInfo, insertInclusionInfo, selectExistCocktail } from "../models/Recipe.js";

//재료 존재 여부 확인
const selectMaterials = async (materials) => {
    const checkingMaterials = await selectMaterialInfo(materials);
    return checkingMaterials;
}

//새로운 재료 추가
const insertMaterials = async (material) => {
    const addedMaterials = await insertMaterialInfo(material);
    return addedMaterials;
}

//새로운 레시피 추가
const insertRecipe = async (recipeInfo) => {
    const addedRecipe = await insertRecipeInfo(recipeInfo);
    return addedRecipe;
}

//기존 레시피 수정
const updateRecipe = async (recipeInfo) => {
    const editedRecipe = await updateRecipeInfo(recipeInfo);
    return editedRecipe;
}

//새로운 레시피+재료 추가
const insertInclusions = async (recipeId, materialIds) => {
    const addedInclusions = await insertInclusionInfo(recipeId, materialIds);
    return addedInclusions;
}

//레시피 중복 확인
const checkExistence = async (cocktail) => {
    const duplication = await selectExistCocktail(cocktail);
    return duplication;
}

export { selectMaterials, insertMaterials, insertRecipe, updateRecipe, insertInclusions, checkExistence };