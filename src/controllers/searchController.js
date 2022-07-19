import { getLists, getRecipe } from "../services/searchService.js";
import { response, errResponse } from "../../config/response.js";

const showSearchLists = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const recipeList = await getLists(keyword);
    
        return res.send(response({"code":200, "message": '검색 조회에 성공하였습니다.'}, recipeList));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '검색 조회에 실패하였습니다.'}));
    }
}

const showRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id
        const recipeList = await getRecipe(recipeId);

        return res.send(response({ "code": 200, "message": '레시피 조회에 성공하였습니다.' }, recipeList));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '레시피 조회에 실패하였습니다.' }));
    }
}

export { showSearchLists, showRecipe };