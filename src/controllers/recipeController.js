import { selectMaterials, insertMaterials, insertRecipe, updateRecipe, insertInclusions, checkExistence } from "../services/recipeService.js";
import { response, errResponse } from "../../config/response.js";

const addRecipes = async (req, res) => {
    try {
        const cocktail = req.body.cocktail;
        const materials = req.body.materials;
        const rate = req.body.rate;
        const content = req.body.content;
        const image = req.file?.location ?? null;
        // console.log(req.file);
        // console.log(image);
        const recipeInfo = {cocktail, rate, content, image};
        let addedMaterialIds;
        let materialIds;

        //이미 존재하는 레시피인지 확인
        const duplication = await checkExistence(cocktail);
        if(duplication){
            return res.send(response({"code":400, "message": '이미 레시피가 존재합니다.'}));
        }

        //이미 존재하는 재료인지 확인 -> 존재하는 재료일 경우 id, 그렇지 않을 경우 재료명 반환
        const checkingMaterials = await selectMaterials(materials);

        //존재하지 않는 재료 재료 테이블에 추가
        if(checkingMaterials.uncheckingMaterials.length > 0){
            addedMaterialIds = await insertMaterials(checkingMaterials.uncheckingMaterials);
        }
        
        //inclusion에 쓰일 재료 아이디 배열로 묶기
        if(addedMaterialIds != undefined){
            materialIds = checkingMaterials.checkingMaterialIds.concat(addedMaterialIds);
        } else {
            materialIds = checkingMaterials.checkingMaterialIds;
        }

        //레시피 추가
        const addedRecipe = await insertRecipe(recipeInfo);
        
        //레시피에 사용되는 재료 정보 inclusion 테이블에 추가
        const recipeId = addedRecipe.recipeId;
        const addedInclusions = await insertInclusions(recipeId, materialIds);

        return res.send(response({"code":200, "message": '레시피 추가에 성공하였습니다.'}, {recipeId: recipeId}));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '레시피 추가에 실패하였습니다.'}));
    }
}

const editRecipes = async (req, res) => {
    try {
        console.log(req.file);
        const cocktail = req.body.cocktail;
        const materials = req.body.materials;
        const rate = req.body.rate;
        const content = req.body.content;
        const image = req.file?.location ?? null;
        const recipeInfo = {cocktail, rate, content, image};
        let addedMaterialIds;
        let materialIds;

        //존재하는 레시피인지 확인
        const existence = await checkExistence(cocktail);
        if(!existence){
            return res.send(response({"code":400, "message": '존재하지 않는 레시피입니다.'}));
        }
    
        //이미 존재하는 재료인지 확인 -> 존재하는 재료일 경우 id, 그렇지 않을 경우 재료명 반환
        const checkingMaterials = await selectMaterials(materials);

        //존재하지 않는 재료 재료 테이블에 추가
        if(checkingMaterials.uncheckingMaterials.length > 0){
            addedMaterialIds = await insertMaterials(checkingMaterials.uncheckingMaterials);
        }
        
        //inclusion에 쓰일 재료 아이디 배열로 묶기
        if(addedMaterialIds != undefined){
            materialIds = checkingMaterials.checkingMaterialIds.concat(addedMaterialIds);
        } else {
            materialIds = checkingMaterials.checkingMaterialIds;
        }

        //레시피 수정
        const editedRecipe = await updateRecipe(recipeInfo);
        
        //레시피에 사용되는 재료 정보 inclusion 테이블에 추가
        const recipeId = editedRecipe.recipeId;
        const addedInclusions = await insertInclusions(recipeId, materialIds);

        return res.send(response({"code":200, "message": '레시피 수정에 성공하였습니다.'}, {recipeId: recipeId}));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '레시피 수정에 실패하였습니다.'}));
    }
}

export { addRecipes, editRecipes };