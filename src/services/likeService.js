import { insertBLike, deleteBLike, insertSLike, deleteSLike } from "../models/Like.js";

//꿀조합 게시판 좋아요 선택
const insertBoardLike = async (postId, userId) => {
    const addedLikeId = await insertBLike(postId, userId);
    return addedLikeId;
}

//꿀조합 게시판 좋아요 취소
const deleteBoardLike = async (postId, userId) => {
    const canceledLike = await deleteBLike(postId, userId);
    return canceledLike;
}

//건의 게시판 좋아요 선택
const insertSuggestionLike = async (suggestionId, userId) => {
    const addedLikeId = await insertSLike(suggestionId, userId);
    return addedLikeId;
}

//건의 게시판 좋아요 취소
const deleteSuggestionLike = async (suggestionId, userId) => {
    const canceledLike = await deleteSLike(suggestionId, userId);
    return canceledLike;
}

export { insertBoardLike, deleteBoardLike, insertSuggestionLike, deleteSuggestionLike };