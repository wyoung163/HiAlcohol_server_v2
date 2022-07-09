import { 
    selectreportedBoards, 
    selectreportedComments, 
    insertCommentReport,
    insertBoardReport, 
    checkCommentDuplication, 
    checkBoardDuplication, 
    updateCommentBlind,
    updateBoardBlind 
} from "../services/reportService.js";
import { response, errResponse } from "../../config/response.js";

//신고된 게시글 조회
const showBoardReport = async (req, res) => {
    try {
        //const userId = req.currentUserId;
        
        const reportedBoards = await selectreportedBoards();

        return res.send(response({"code":200, "message": '신고된 게시글 목록 조회에 성공하였습니다.'}, reportedBoards));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '신고된 게시글 목록 조회에 실패하였습니다.'}));
    }


}

//신고된 댓글 조회
const showCommentReport = async (req, res) => {
    try {
        // const userId = req.currentUserId;

        const reportedComments = await selectreportedComments();
        
        return res.send(response({"code":200, "message": '신고된 댓글과 게시글 목록 조회에 성공하였습니다.'}, reportedComments));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '신고된 댓글과 게시글 목록 조회에 실패하였습니다.'}));
    }
 
}

//댓글 신고
const addCommentReport = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.boardId;
        const commentId = req.params.commentId;
        
        const duplication = await checkCommentDuplication(postId, commentId, userId);
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 댓글입니다.'}));
        }

        const reportedComment = await insertCommentReport(postId, commentId, userId);

        return res.send(response({"code":200, "message": '댓글 신고에 성공하였습니다.'}, reportedComment));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '댓글 신고에 실패하였습니다.'}));
    }
}

//게시글 신고
const addBoardReport = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.id;
        
        const duplication = await checkBoardDuplication(postId, userId);
        if(duplication.length!=0){
            return res.send(response({"code":400, "message": '이미 신고한 게시글입니다.'}));
        }

        const reportedBoard = await insertBoardReport(postId, userId);
        return res.send(response({ "code": 200, "message": '게시글 신고에 성공하였습니다.'}, reportedBoard ));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '게시글 신고에 실패하였습니다.' }));
    }
}

const editCommentBlind = async (req,res) => {
    try {
        //const userId = req.currentUserId;
        const postId = req.params.boardId;
        const commentId = req.params.commentId;

        const isBlind = await updateCommentBlind(postId, commentId);
        if(isBlind.isBlind == true){
            return res.send(response({ "code": 200, "message": '댓글 숨김 처리에 성공하였습니다.'}, isBlind ));
        } else {
            return res.send(response({ "code": 200, "message": '댓글 숨김 철회에 성공하였습니다.'}, isBlind ));
        }
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '댓글 숨김 처리 및 철회에 실패하였습니다.' }));
    }
}

const editBoardBlind = async (req,res) => {
    try {
        //const userId = req.currentUserId;
        const postId = req.params.id;

        const isBlind  = await updateBoardBlind(postId);
        if(isBlind.isBlind == true){
            return res.send(response({ "code": 200, "message": '게시글 숨김 처리에 성공하였습니다.'}, isBlind ));
        } else {
            return res.send(response({ "code": 200, "message": '게시글 숨김 철회에 성공하였습니다.'}, isBlind ));
        }
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '게시글 숨김 처리 및 철회에 실패하였습니다.' }));
    }
}

export { 
    addCommentReport, 
    addBoardReport, 
    showBoardReport, 
    showCommentReport,  
    editCommentBlind,
    editBoardBlind 
};
