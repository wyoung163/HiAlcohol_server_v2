import { selectTestResult } from "../services/mbtiTestService.js";
import { response, errResponse } from "../../config/response.js";

const showTestResult = async (req, res) => {
    try {
        const answers = req.query.result;

        const testResult = await selectTestResult(answers);
    
        return res.send(response({"code":200, "message": '테스트를 완료합니다.'}, testResult));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '테스트 완료에 실패하였습니다.'}));
    }
}

export { showTestResult };