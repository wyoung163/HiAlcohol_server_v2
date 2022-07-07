import { insertRecipeInfo, insertMaterialInfo, selectMaterialInfo, insertInclusionInfo } from "../models/Recipe.js";

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

//새로운 레시피+재료 추가
const insertInclusions = async (recipeId, materialIds) => {
    const addedInclusions = await insertInclusionInfo(recipeId, materialIds);
    return addedInclusions;
}

export { selectMaterials, insertMaterials, insertRecipe, insertInclusions };