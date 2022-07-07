import { db } from "../../config/db.js";

//전체 건의 게시글 조회
async function insertReportedComment(commentId, userId) {
    const insertReportedCommentQuery = `
        insert into report_comment(commentId, userId, createdate)
        values(?, ?, now())
    `;
    const [allSuggestions] = await db.query(insertReportedCommentQuery, [commentId, userId]);
    return allSuggestions;
}

//특정 건의 게시글 조회
async function insertReportedBoard(postId, userId) {
    const insertReportedBoardQuery = `
        insert into report_post(postId, userId, createdate)
        values(?, ?, now())
    `;
    const [suggestion] = await db.query(insertReportedBoardQuery, [postId, userId]);
    return suggestion;
}

async function checkExistence(id, userId, type) {
    var checkExistenceQuery;

    if(type == 'comment'){
        checkExistenceQuery = `
            select * from report_comment
            where commentId =  ? and userId = ? 
        `;
    } else if(type == 'post') {
        checkExistenceQuery = `
            select * from report_comment
            where commentId =  ? and userId = ? 
        `;
    }

    const [duplication] = await db.query(checkExistenceQuery, [id, userId]);
    return duplication;
}

export {
    insertReportedComment, 
    insertReportedBoard,
    checkExistence
};