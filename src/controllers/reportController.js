import { insertCommentReport, insertBoardReport, checkDuplication } from "../services/reportService.js";
import { response, errResponse } from "../../config/response.js";

//댓글 신고
const addCommentReport = async (req, res) => {
    try {
        // const userId = req.session.id;
        // const userId = req.body.userId;
        const commentId = req.params.id;
        const reportedComment = await insertCommentReport(commentId, userId);
        const type = 'comment';
        const duplication = await checkDuplication(commentId, userId, type);
        
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 댓글입니다.'}));
        }

        return res.send(response({"code":200, "message": '댓글 신고에 성공하였습니다.'}));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '댓글 신고에 실패하였습니다.'}));
    }
}

//게시글 신고
const addBoardReport = async (req, res) => {
    try {
        // const userId = req.session.id;
        // const userId = req.body.userId;
        const postId = req.params.id;
        const reportedBoard = await insertBoardReport(postId, userId);
        const type = 'post';
        const duplication = await checkDuplication(postId, userId, type);
        
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 게시글입니다.'}));
        }

        return res.send(response({ "code": 200, "message": '게시글 신고에 성공하였습니다.' }));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '게시글 신고에 실패하였습니다.' }));
    }
}

export { addCommentReport, addBoardReport };