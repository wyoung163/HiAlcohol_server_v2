import { getRecommendedCocktail } from "../services/homeService.js";
import { response, errResponse } from "../../config/response.js";

const showRecommendedCocktail = async (req, res) => {
    try {
        const recommendedCocktail = await getRecommendedCocktail();
    
        return res.send(response({"code":200, "message": '메인 홈 화면 조회에 성공하였습니다.'}, recommendedCocktail));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '메인 홈 화면 조회에 실패하였습니다.'}));
    }
}

export { showRecommendedCocktail };