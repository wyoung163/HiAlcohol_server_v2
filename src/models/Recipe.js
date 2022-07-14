import { db } from "../../config/db.js";

//존재하는 재료 id, 존재하지 않는 재료명 반환
async function selectMaterialInfo(materials) {
    var uncheckingMaterials = [];
    var checkingMaterialIds = [];
    let checkingMaterials;
    const selectMaterialQuery = `
        select id from material
        where material = ?        
    `;

    for(var i = 0; i < materials.length; i++){
        checkingMaterials = await db.query(selectMaterialQuery, materials[i]);
        if(checkingMaterials[0].length == 0){
            uncheckingMaterials.push(materials[i]);
        } else if(checkingMaterials[0].length > 0) {
            checkingMaterialIds.push(checkingMaterials[0][0].id);
        }
    }

    return {uncheckingMaterials, checkingMaterialIds};
}

//추가한 재료 id 반환
async function insertMaterialInfo(materials) {
    var addedMaterials = [];
    const insertMaterialQuery = `
        insert into material(material)
        values(?)
    `;

    for(var i=0; i <materials.length; i++){
        let [addedmaterial] = await db.query(insertMaterialQuery, [materials[i]]);
        addedMaterials.push(addedmaterial.insertId);
    }
    return addedMaterials;
}

//추가한 레시피 id, 레시피 정보 반환
async function insertRecipeInfo(recipeInfo) {
    const insertRecipeInfoQuery = `
        insert into recipe(cocktail, rate, content)
        values(?, ?, ?)
    `;
    const [addedRecipe] = await db.query(insertRecipeInfoQuery, [recipeInfo.cocktail, recipeInfo.rate, recipeInfo.content]);

    const recipeId = addedRecipe.insertId;
    return {recipeId, addedRecipe};
}

//추가한 레시피 id, 레시피 정보 반환
async function updateRecipeInfo(recipeInfo) {
    const insertRecipeInfoQuery = `
        update recipe set cocktail = ?, rate = ?, content = ?, imageUrl =?
    `;
    const [editedRecipe] = await db.query(insertRecipeInfoQuery, [recipeInfo.cocktail, recipeInfo.rate, recipeInfo.content]);

    const recipeId = editedRecipe.insertId;
    return {recipeId, editedRecipe};
}

//추가한 레시피+재료 정보 반환
async function insertInclusionInfo(recipeId, materialIds) {
    let addedInclusions = [];
    const insertInclusionInfoQuery = `
        insert into inclusion(recipeId, materialId )
        values(?, ?)
    `;

    for(var i = 0; i < materialIds.length; i++){
        let [Inclusions] = await db.query(insertInclusionInfoQuery, [recipeId, materialIds[i]]);
        addedInclusions.push(Inclusions.inserId);
    }

    return addedInclusions;
}

//중복 확인
async function selectExistCocktail(cocktail) {
    const selectExistCocktailQuery = `
        select * from recipe
        where cocktail = ?
    `;

    const [duplication] = await db.query(selectExistCocktailQuery, [cocktail]);

    return duplication;
}


export {
    selectMaterialInfo,
    insertMaterialInfo, 
    insertRecipeInfo,
    updateRecipeInfo,
    insertInclusionInfo,
    selectExistCocktail
};