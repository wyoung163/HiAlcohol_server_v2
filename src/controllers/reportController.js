import { 
    selectreportedBoards, 
    selectreportedComments, 
    insertCommentReport, 
    insertBoardReport, 
    checkCommentDuplication, 
    checkBoardDuplication 
} from "../services/reportService.js";
import { response, errResponse } from "../../config/response.js";

//신고된 게시글 조회
const showBoardReport = async (req, res) => {
    try {
        // const userId = req.session.id;
        // const userId = req.body.userId;
        // const userId = req.currentUserId;
        
        const reportedBoards = await selectreportedBoards();
        // const reportCounts = reportedBoards.count;
        // const reportedBoardsInfo = reportedBoards.reportedBoardsInfo;

        return res.send(response({"code":200, "message": '댓글 신고에 성공하였습니다.'}, reportedBoards));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '댓글 신고에 실패하였습니다.'}));
    }


}

//신고된 댓글 조회
const showCommentReport = async (req, res) => {
     // const userId = req.session.id;
     const userId = req.body.userId;
     // const userId = req.currentUserId;
     const postId = req.params.boardId;
     const commentId = req.params.commentId;

     const reportedComments = await selectreportedComments();
 
}

//댓글 신고
const addCommentReport = async (req, res) => {
    try {
        // const userId = req.session.id;
        const userId = req.body.userId;
        // const userId = req.currentUserId;
        const postId = req.params.boardId;
        const commentId = req.params.commentId;
        
        const duplication = await checkCommentDuplication(postId, commentId, userId);
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 댓글입니다.'}));
        }

        const reportedComment = await insertCommentReport(postId, commentId, userId);
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
        const userId = req.body.userId;
        const postId = req.params.id;
        
        const duplication = await checkBoardDuplication(postId, userId);
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 게시글입니다.'}));
        }

        const reportedBoard = await insertBoardReport(postId, userId);
        return res.send(response({ "code": 200, "message": '게시글 신고에 성공하였습니다.' }));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '게시글 신고에 실패하였습니다.' }));
    }
}

export { addCommentReport, addBoardReport, showBoardReport, showCommentReport };
