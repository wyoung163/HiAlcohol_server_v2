import { db } from "../../config/db.js";

//신고된 게시글
async function selectBoardReports() {
    var count = [];
    var reportedBoardsInfo = [];
    const selectBoardReportsQuery = `
        select DISTINCT postId from report_post
        order by postId desc;
    `;
    const [reportedBoards] = await db.query(selectBoardReportsQuery);

    const countQuery = `
        select count(*) from report_post
        where postId = ?;
    `;
    for(var i = 0; i < reportedBoards.length; i++){
        let [num] = await db.query(countQuery, [reportedBoards[i].postId]);
        count.push(num);
    }

    const boardsInfoQuery =`
        select p.id, u.nickname, p.title, p.content, p.createdate
        from post as p
        join user as u on p.userId = u.id
        where p.id = ?;
    `;
    for(var i = 0; i < reportedBoards.length; i++){
        let [Info] = await db.query(boardsInfoQuery, [reportedBoards[i].postId]);
        reportedBoardsInfo.push(Info);
    }

    for(var i = 0; i < reportedBoards.length; i++){
        Object.assign(reportedBoardsInfo[i][0], count[i][0]);
    }

    return reportedBoardsInfo;
}

//신고된 댓글의 게시글
async function selectCommentReports() {

}

//댓글 신고
async function insertReportedComment(postId, commentId, userId) {
    const insertReportedCommentQuery = `
        insert into report_comment(postId, commentId, userId, createdate)
        values(?, ?, ?, now())
    `;
    const [allSuggestions] = await db.query(insertReportedCommentQuery, [postId, commentId, userId]);
    return allSuggestions;
}

//게시글 신고 
async function insertReportedBoard(postId, userId) {
    const insertReportedBoardQuery = `
        insert into report_post(postId, userId, createdate)
        values(?, ?, now())
    `;
    const [suggestion] = await db.query(insertReportedBoardQuery, [postId, userId]);
    return suggestion;
}

async function checkCommentExistence(postId, commentId, userId) {
    const checkCommentExistenceQuery = `
        select * from report_comment
        where postId = ? and commentId =  ? and userId = ? 
    `;

    const [duplication] = await db.query(checkCommentExistenceQuery, [postId, commentId, userId]);
    return duplication;
}

async function checkBoardExistence(postId, userId) {
    const checkBoardExistenceQuery = `
        select * from report_post
        where postId =  ? and userId = ? 
    `;
    
    const [duplication] = await db.query(checkBoardExistenceQuery, [postId, userId]);
    return duplication;
}

export {
    selectBoardReports, 
    selectCommentReports, 
    insertReportedComment, 
    insertReportedBoard,
    checkCommentExistence,
    checkBoardExistence
};