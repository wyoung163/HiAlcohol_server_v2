import { insertBoardLike, deleteBoardLike, insertSuggestionLike, deleteSuggestionLike } from "../services/likeService.js";
import { response, errResponse } from "../../config/response.js";

//꿀조합 게시판 좋아요 선택
const addBoardLike = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.id;
        const addedLikeId = await insertBoardLike(postId, userId);

        return res.send(response({"code":200, "message": '좋아요 선택에 성공하였습니다.'},  {"likedId ": addedLikeId}));
    } catch(err) {
        console.log(err);
        return res.send(errResponse({"code": 400, "message": '좋아요 선택에 실패하였습니다.'}));
    }
}

//꿀조합 게시판 좋아요 취소
const cancelBoardLike = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.id;
        const canceledLike = await deleteBoardLike(postId, userId);

        return res.send(response({ "code": 200, "message": '좋아요 취소에 성공하였습니다.' }));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '좋아요 취소에 실패하였습니다.' }));
    }
}

//건의 게시판 좋아요 선택
const addSuggestionLike = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const suggestionId = req.params.id;
        const addedLikeId = await insertSuggestionLike(suggestionId, userId);

        return res.send(response({ "code": 200, "message": '좋아요 선택에 성공하였습니다.' }, { "likedId ": addedLikeId }));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '좋아요 선택에 실패하였습니다.' }));
    }
}

//건의 게시판 좋아요 취소
const cancelSuggestionLike = async (req, res) => {
    try {
        const userId = req.currentUserId;
        const suggestionId = req.params.id;
        const canceledLike = await deleteSuggestionLike(suggestionId, userId);

        return res.send(response({ "code": 200, "message": '좋아요 취소에 성공하였습니다.' }));
    } catch (err) {
        console.log(err);
        return res.send(errResponse({ "code": 400, "message": '좋아요 취소에 실패하였습니다.' }));
    }
}


export { addBoardLike, cancelBoardLike, addSuggestionLike, cancelSuggestionLike };