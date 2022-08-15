import { db } from "../../config/db.js";

//레시피 존재 확인
async function selectExistence(id) {
    const  selectExistenceQuery = `
        select * from recipe
        where id = ?
    `;

    const [existence] = await db.query(selectExistenceQuery, [id]);
    console.log(existence);
    return existence;
}

//동일한 칵테일명 존재 확인
async function selectCocktail(cocktail) {
    const selectCocktailQuery = `
        select * from recipe
        where cocktail = ?
    `;

    const [existence] = await db.query(selectCocktailQuery, [cocktail]);
    console.log(existence);
    return existence;
}

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
    //디폴트 이미지
    const defaultImage = 'https://rabbitpull.kr.objectstorage.ncloud.com/users/1659007051208';
    if(recipeInfo.image == null){
        recipeInfo.image = defaultImage;
    }

    const insertRecipeInfoQuery = `
        insert into recipe(cocktail, rate, content, image)
        values(?, ?, ?, ?)
    `;

    const [addedRecipe] = await db.query(insertRecipeInfoQuery, [recipeInfo.cocktail, recipeInfo.rate, recipeInfo.content, recipeInfo.image]);
    const recipeId = addedRecipe.insertId;
    console.log(recipeId);
    return {recipeId, addedRecipe};
}

//수정한 레시피 id, 레시피 정보 반환
async function updateRecipeInfo(recipeInfo) {
    //디폴트 이미지
    const defaultImage = 'https://rabbitpull.kr.objectstorage.ncloud.com/users/1659007051208';
    if(recipeInfo.image == null){
        recipeInfo.image = defaultImage;
    }

    //존재하는 레시피인지 확인
    const existence = await selectCocktail(recipeInfo.cocktail);
    if(existence.length > 0 && existence[0].id != recipeInfo.id){
        return ;
    }

    const updateRecipeInfoQuery = `
        update recipe set cocktail = ?, rate = ?, content = ?, image =?
        where id = ?
    `;

    const [editedRecipe] = await db.query(updateRecipeInfoQuery, [recipeInfo.cocktail, recipeInfo.rate, recipeInfo.content, recipeInfo.image, recipeInfo.id]);
    return {editedRecipe};
}

//추가한 레시피+재료 정보 반환
async function insertInclusionInfo(recipeId, materialIds) {
    let unpresentMaterialIds = [];
    let addedInclusions = [];

    //불필요한 inclusion 삭제
    const deleteInclusionQuery = `
        delete from inclusion
        where recipeId = ?;
    `
    await db.query(deleteInclusionQuery, [recipeId]);

    //이미 존재하는지 확인
    const selectInclusionQuery = `
        select * from inclusion
        where recipeId = ? and materialId = ?
    `

    for(var i = 0; i < materialIds.length; i++){
        let [existedInclusions] = await db.query(selectInclusionQuery, [recipeId, materialIds[i]]);
        if(existedInclusions.length <= 0){
            unpresentMaterialIds.push(materialIds[i]);
        }
    }

    //없으면 insert
    const insertInclusionInfoQuery = `
        insert into inclusion(recipeId, materialId)
        values(?, ?)
    `;

    for(var i = 0; i < unpresentMaterialIds.length; i++){
        let [Inclusions] = await db.query(insertInclusionInfoQuery, [recipeId, unpresentMaterialIds[i]]);
        addedInclusions.push(Inclusions.inserId);
    }

    return addedInclusions;
}

export {
    selectMaterialInfo,
    insertMaterialInfo, 
    insertRecipeInfo,
    updateRecipeInfo,
    insertInclusionInfo,
    selectExistence,
    selectCocktail
};