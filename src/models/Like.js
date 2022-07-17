import { db } from "../../config/db.js";

//전체 건의 게시글 조회
async function insertLike(postId, userId) {
    const insertLikeQuery = `
        insert into liked(postId, userId)
        values(?, ?)
    `;
    const [addedLike] = await db.query(insertLikeQuery, [postId, userId]);
    const addedLikeId = addedLike.insertId;
    return addedLikeId;
}

//특정 건의 게시글 조회
async function deleteLike(postId, userId) {
    const deleteLikeQuery = `
        delete from liked 
        where postId =? and userId = ?
    `;
    const [canceledLike] = await db.query(deleteLikeQuery, [postId, userId]);
    return canceledLike;
}

export {
    insertLike, 
    deleteLike
};