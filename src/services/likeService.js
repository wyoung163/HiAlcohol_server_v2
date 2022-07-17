import { insertLike, deleteLike } from "../models/Like.js";

//좋아요 선택
const insertBoardLike = async (postId, userId) => {
    const addedLikeId = await insertLike(postId, userId);
    return addedLikeId;
}

//좋아요 취소
const deleteBoardLike = async (postId, userId) => {
    const canceledLike = await deleteLike(postId, userId);
    return canceledLike;
}

export { insertBoardLike, deleteBoardLike };