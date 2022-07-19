import { db } from "../../config/db.js";

//꿀조합 게시판 좋아요 선택
async function insertBLike(postId, userId) {
    const insertLikeQuery = `
        insert into liked(postId, userId)
        values(?, ?)
    `;
    const [addedLike] = await db.query(insertLikeQuery, [postId, userId]);
    const addedLikeId = addedLike.insertId;
    return addedLikeId;
}

//꿀조합 게시판 좋아요 취소
async function deleteBLike(postId, userId) {
    const deleteLikeQuery = `
        delete from liked 
        where postId =? and userId = ?
    `;
    const [canceledLike] = await db.query(deleteLikeQuery, [postId, userId]);
    return canceledLike;
}

//건의 게시판 좋아요 선택
async function insertSLike(suggestionId, userId) {
    const insertLikeQuery = `
        insert into suggestion_liked(suggestionId, userId)
        values(?, ?)
    `;
    const [addedLike] = await db.query(insertLikeQuery, [suggestionId, userId]);
    const addedLikeId = addedLike.insertId;
    return addedLikeId;
}

//건의 게시판 좋아요 취소
async function deleteSLike(suggestionId, userId) {
    const deleteLikeQuery = `
        delete from suggestion_liked 
        where suggestionId =? and userId = ?
    `;
    const [canceledLike] = await db.query(deleteLikeQuery, [suggestionId, userId]);
    return canceledLike;
}

export {
    insertBLike, 
    deleteBLike,
    insertSLike, 
    deleteSLike
};